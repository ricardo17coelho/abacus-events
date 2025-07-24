<template>
  <UiDialog
    v-model="model"
    :loading="isLoadingItem"
    max-width="600"
    :title="t('labels.informations.title')"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #content>
      <EventInformationsForm ref="formRef" v-model="form" />
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
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import { merge2ObjectsIfKeysExists } from '@/utils/merge';
import useApiEventInformations from '@/api/event-informations.ts';
import type { EventInformation } from '@/api/types/EventInformation.ts';
import EventInformationsForm from '@/components/event/event-informations/EventInformationsForm.vue';

const props = defineProps({
  eventId: {
    type: String,
    required: true,
  },
  itemId: {
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
  content: {
    [locale.value]: '',
  },
  img_path: undefined,
};

const form = ref({
  ...DEFAULT_FORM,
});

const isLoading = ref(false);
const formRef = ref();

const {
  updateEventInformation,
  createEventInformation,
  getEventInformationById,
} = useApiEventInformations();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.itemId) {
      // edit
      const { error, data } = await updateEventInformation(
        props.itemId,
        form.value,
      );

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', form.value);
          form.value = { ...DEFAULT_FORM };
          isLoading.value = false;
          toast.success('Post updated!');
        }
      }
    } else {
      // add
      const { error, data } = await createEventInformation({
        ...form.value,
        event_id: props.eventId,
      });

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', data);
          form.value = { ...DEFAULT_FORM };
          toast.success('Post created!');
        }
      }
    }
    isLoading.value = false;
    model.value = false;
  } else {
    toast.error(t('errors.validation.invalid'));
    isLoading.value = false;
  }
}

const item = ref<EventInformation>();
const isLoadingItem = ref(false);

async function onGetCompanyInformationsById(id: string) {
  isLoadingItem.value = true;
  const { error, data } = await getEventInformationById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      item.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingItem.value = false;
}

watch(
  () => model.value,
  (newValue) => {
    if (newValue && props.itemId) {
      onGetCompanyInformationsById(props.itemId);
    }
  },
);
</script>
