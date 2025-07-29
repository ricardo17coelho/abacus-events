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
      <EventInformationsCategoriesForm
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
import { UiDialog } from '@lib/ui';
import EventInformationsCategoriesForm from './EventInformationsCategoriesForm.vue';
import type { EventInformationCategory } from '@/api/types/EventInformation.ts';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import { merge2ObjectsIfKeysExists } from '@/utils/merge';
import { clone } from '@/utils/clone';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { requireInjection } from '@/utils/injection.ts';
import useApiEventInformations from '@/api/event-informations.ts';

const props = defineProps({
  eventInformationsCategoryId: {
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
  color: '',
  icon: '',
};

const form = ref({
  ...DEFAULT_FORM,
});

const {
  createEventInformationCategory,
  updateEventInformationCategory,
  getEventInformationCategoryById,
} = useApiEventInformations();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventInformationsCategoryId) {
      // edit
      const { error, data } = await updateEventInformationCategory(
        props.eventInformationsCategoryId,
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
          toast.success('Event timetable updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventInformationCategory({
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

const timelineCategory = ref<EventInformationCategory>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventInformationCategoryById(id);

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
    if (newValue && props.eventInformationsCategoryId) {
      await onGetDataById(props.eventInformationsCategoryId);
    }
  },
);
</script>
