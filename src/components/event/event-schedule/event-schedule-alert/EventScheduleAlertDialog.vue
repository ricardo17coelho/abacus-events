<template>
  <UiDialog v-model="model" max-width="600" :title="t('labels.alert_hint')">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <EventScheduleAlertForm ref="formRef" v-model="form" />
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
import EventScheduleAlertForm from './EventScheduleAlertForm.vue';
// apis
import useApiEventScheduleAlert from '@/api/event-schedule-alert.ts';
// types & constants
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type { EventSchedule } from '@/api/types/EventSchedule.ts';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import { merge2ObjectsIfKeysExists } from '@/utils/merge.ts';

const props = defineProps({
  eventScheduleAlertId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t, locale } = useI18n();

const DEFAULT_FORM = {
  type: undefined,
  icon: undefined,
  title: {
    [locale.value]: '',
  },
  message: {
    [locale.value]: '',
  },
};

const form = ref({
  ...DEFAULT_FORM,
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const {
  createEventScheduleAlert,
  updateEventScheduleAlert,
  getEventScheduleAlertById,
} = useApiEventScheduleAlert();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  if (!currentEvent.value) return;
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;

    if (props.eventScheduleAlertId) {
      const { error, data } = await updateEventScheduleAlert(
        props.eventScheduleAlertId,
        {
          ...form.value,
          event_id: currentEvent.value?.id,
        },
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
          toast.success('Updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventScheduleAlert({
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
  const { error, data } = await getEventScheduleAlertById(id);

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
    if (newValue && props.eventScheduleAlertId) {
      onGetDataById(props.eventScheduleAlertId);
    }
  },
);
</script>
