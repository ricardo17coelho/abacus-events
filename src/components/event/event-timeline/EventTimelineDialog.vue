<template>
  <UiDialog
    v-model="model"
    max-width="600"
    :title="t('labels.program_timeline')"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <EventTimelineForm
        v-if="currentEvent"
        ref="formRef"
        v-model="form"
        :event-id="currentEvent?.id"
      />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ t('actions.save') }}
      </VBtnPrimary>
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
// components
import { UiDialog } from '@lib/ui';
import EventTimelineForm, { DEFAULT_FORM } from './EventTimelineForm.vue';
// apis
import useApiEventTimeline from '@/api/event-timeline.ts';
// types & constants
import type { EventTimeline } from '@/api/types/EventTimeline.ts';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
// utils
import { merge2ObjectsIfKeysExists } from '@/utils/merge';
import { clone } from '@/utils/clone';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { requireInjection } from '@/utils/injection.ts';

const props = defineProps({
  eventTimetableId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { t, locale } = useI18n();

const DEFAULT_FORM_DATA = {
  ...DEFAULT_FORM,
  title: {
    [locale.value]: '',
  },
  note: {
    [locale.value]: '',
  },
};

const form = ref({
  ...DEFAULT_FORM_DATA,
});

const timelineItem = ref<EventTimeline>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventTimelineById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      timelineItem.value = data;
      form.value = merge2ObjectsIfKeysExists(
        { ...DEFAULT_FORM_DATA },
        {
          ...data,
          persons: data.persons.map((i) => i.event_person_id),
          locations: data.locations.map((i) => i.event_timeline_location_id),
        },
      );
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.eventTimetableId) {
      onGetDataById(props.eventTimetableId);
    }
  },
);

const {
  createEventTimeline,
  updateEventTimeline,
  getEventTimelineById,
  removeEventTimelinePerson,
  createEventTimelinePerson,
  createEventTimelineLocationMap,
  removeEventTimelineLocationMap,
} = useApiEventTimeline();

const isLoading = ref(false);
const formRef = ref();

async function handleEventPersons(
  eventTimetableId: string,
  personsIds: string[],
) {
  const currentPersonIds =
    timelineItem.value?.persons?.map((item) => item.event_person_id) || [];

  // IDs to add
  const toAdd = personsIds.filter((id) => !currentPersonIds.includes(id));

  for (const id of toAdd) {
    await createEventTimelinePerson({
      event_person_id: id,
      event_timeline_id: eventTimetableId,
    });
  }

  // IDs to remove
  const toRemove = currentPersonIds.filter((id) => !personsIds.includes(id));

  for (const id of toRemove) {
    await removeEventTimelinePerson(id, 'event_person_id');
  }
}

async function handleEventLocations(
  eventTimetableId: string,
  locationsIds: string[],
) {
  const currentLocationsIds =
    timelineItem.value?.locations?.map(
      (item) => item.event_timeline_location_id,
    ) || [];

  // IDs to add
  const toAdd = locationsIds.filter((id) => !currentLocationsIds.includes(id));

  for (const id of toAdd) {
    await createEventTimelineLocationMap({
      event_timeline_location_id: id,
      event_timeline_id: eventTimetableId,
    });
  }

  // IDs to remove
  const toRemove = currentLocationsIds.filter(
    (id) => !locationsIds.includes(id),
  );

  for (const id of toRemove) {
    await removeEventTimelineLocationMap(id, 'event_timeline_location_id');
  }
}

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    const formData = { ...form.value };
    const persons = formData.persons;
    if ('persons' in formData) {
      delete formData.persons;
    }
    const locations = formData.locations;
    if ('locations' in formData) {
      delete formData.locations;
    }
    if (props.eventTimetableId) {
      // edit
      const { error, data } = await updateEventTimeline(
        props.eventTimetableId,
        { ...formData, event_id: currentEvent.value?.id },
      );

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          await handleEventPersons(data.id, persons);
          await handleEventLocations(data.id, locations);
          const { data: eventData } = await getEventTimelineById(data.id);

          emit('success', eventData);
          form.value = { ...DEFAULT_FORM_DATA };
          isLoading.value = false;
          toast.success('Event timetable updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventTimeline({
        ...formData,
        event_id: currentEvent.value?.id,
      });

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          await handleEventPersons(data.id, persons);
          await handleEventLocations(data.id, locations);
          const { data: eventData } = await getEventTimelineById(data.id);

          emit('success', eventData);
          form.value = clone(DEFAULT_FORM_DATA);
          toast.success('Event timetable created!');
          model.value = false;
        }
      }
    }
    isLoading.value = false;
  } else {
    toast.error(t('errors.validation.invalid'));
    isLoading.value = false;
  }
}
</script>
