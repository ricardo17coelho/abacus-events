<template>
  <UiDialog
    v-model="model"
    max-width="600"
    :title="t('labels.program_timeline_category')"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <EventTimelineCategoriesForm
        v-if="currentEvent"
        ref="formRef"
        v-model="form"
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
import EventTimelineCategoriesForm from './EventTimelineCategoriesForm.vue';
// apis
import useApiEventTimeline from '@/api/event-timeline.ts';
// types & constants
import type { EventTimelineLocation } from '@/api/types/EventTimeline.ts';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
// utils
import { merge2ObjectsIfKeysExists } from '@/utils/merge';
import { clone } from '@/utils/clone';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { requireInjection } from '@/utils/injection.ts';

const props = defineProps({
  eventTimelineLocationId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { t, locale } = useI18n();

const DEFAULT_FORM = {
  title: {
    [locale.value]: '',
  },
  img_url: '',
};

const form = ref({
  ...DEFAULT_FORM,
});

const {
  createEventTimelineLocation,
  updateEventTimelineLocation,
  getEventTimelineLocationById,
} = useApiEventTimeline();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventTimelineLocationId) {
      // edit
      const { error, data } = await updateEventTimelineLocation(
        props.eventTimelineLocationId,
        { ...form.value, event_id: currentEvent.value?.id },
      );

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', data);
          form.value = { ...DEFAULT_FORM };
          isLoading.value = false;
          toast.success('Timeline location updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventTimelineLocation({
        ...form.value,
        event_id: currentEvent.value?.id,
      });

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', data);
          form.value = clone(DEFAULT_FORM);
          toast.success('Timeline location created!');
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

const timelineCategory = ref<EventTimelineLocation>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventTimelineLocationById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      timelineCategory.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.eventTimelineLocationId) {
      await onGetDataById(props.eventTimelineLocationId);
    }
  },
);
</script>
