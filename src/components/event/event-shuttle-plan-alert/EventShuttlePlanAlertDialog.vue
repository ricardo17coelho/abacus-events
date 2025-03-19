<template>
  <UiDialog v-model="model" max-width="600" :title="t('labels.alert_hint')">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <EventShuttlePlanAlertForm ref="formRef" v-model="form" />
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
import EventShuttlePlanAlertForm from './EventShuttlePlanAlertForm.vue';
// apis
import useApiEventShuttleAlert from '@/api/event-shuttle-plan-alert.ts';
// types & constants
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type { EventShuttlePlan } from '@/api/types/EventShuttlePlan.ts';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import { merge2ObjectsIfKeysExists } from '@/utils/merge.ts';

const props = defineProps({
  eventShuttlePlanAlertId: {
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
  createEventShuttleAlert,
  updateEventShuttleAlert,
  getEventShuttleAlertById,
} = useApiEventShuttleAlert();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  if (!currentEvent.value) return;
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;

    if (props.eventShuttlePlanAlertId) {
      const { error, data } = await updateEventShuttleAlert(
        props.eventShuttlePlanAlertId,
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
      const { error, data } = await createEventShuttleAlert({
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

const shuttlePlan = ref<EventShuttlePlan>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventShuttleAlertById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      shuttlePlan.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.eventShuttlePlanAlertId) {
      onGetDataById(props.eventShuttlePlanAlertId);
    }
  },
);
</script>
