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
      <EventScheduleItemForm ref="formRef" v-model="form" />
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
import EventScheduleItemForm from './EventScheduleItemForm.vue';
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
    required: true,
  },
  eventScheduleItemId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t } = useI18n();

const DEFAULT_FORM = {
  text: undefined,
  text_link: undefined,
  order: undefined,
};

const form = ref({
  ...DEFAULT_FORM,
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const {
  createEventScheduleItem,
  updateEventScheduleItem,
  getEventScheduleItemById,
} = useApiEventSchedule();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  if (!currentEvent.value) return;
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventScheduleItemId) {
      const { error, data } = await updateEventScheduleItem(
        props.eventScheduleItemId,
        {
          ...form.value,
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
      const { error, data } = await createEventScheduleItem({
        ...form.value,
        event_schedule_id: props.eventScheduleId,
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
  const { error, data } = await getEventScheduleItemById(id);

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
    if (newValue && props.eventScheduleItemId) {
      onGetDataById(props.eventScheduleItemId);
    }
  },
);
</script>
