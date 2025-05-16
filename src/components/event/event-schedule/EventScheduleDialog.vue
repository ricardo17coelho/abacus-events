<template>
  <UiDialog
    v-model="model"
    max-width="600"
    :title="t('labels.features.SCHEDULE')"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <EventScheduleForm ref="formRef" v-model="form" />
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
import EventScheduleForm from './EventScheduleForm.vue';
// apis
import useApiEventSchedule from '@/api/event-schedule.ts';
// types & constants
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type { EventSchedule } from '@/api/types/EventSchedule.ts';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import { merge2ObjectsIfKeysExists } from '@/utils/merge.ts';

const props = defineProps({
  eventScheduleId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t, locale } = useI18n();

const DEFAULT_FORM = {
  title: {
    [locale.value]: '',
  },
  description: {
    [locale.value]: '',
  },
  icon: undefined,
};

const form = ref({
  ...DEFAULT_FORM,
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { createEventSchedule, updateEventSchedule, getEventScheduleById } =
  useApiEventSchedule();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  if (!currentEvent.value) return;
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventScheduleId) {
      const { error, data } = await updateEventSchedule(props.eventScheduleId, {
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
          form.value = { ...DEFAULT_FORM };
          isLoading.value = false;
          toast.success('Updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventSchedule({
        ...form.value,
        event_id: currentEvent.value.id,
      });

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', data);
          form.value = { ...DEFAULT_FORM };
          toast.success('Item added!');
        }
      }
    }

    isLoading.value = false;
  } else {
    toast.error(t('errors.validation.invalid'));
    isLoading.value = false;
  }
}

const eventSchedule = ref<EventSchedule>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventScheduleById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      eventSchedule.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.eventScheduleId) {
      onGetDataById(props.eventScheduleId);
    }
  },
);
</script>
