<template>
  <UiDialog v-model="model" :title="t('labels.contact')" width="500">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #content>
      <EventContactForm ref="formRef" v-model="form" />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ t('actions.send') }}
      </VBtnPrimary>
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
// components
import { UiDialog } from '@lib/ui';
import EventContactForm from './EventContactForm.vue';
// apis
import useApiEventContact from '@/api/event-contact.ts';
// composables
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { clone } from '@/utils/clone.ts';
import { merge2ObjectsIfKeysExists } from '@/utils/merge.ts';
import type { EventContact } from '@/api/types/EventContact.ts';

const props = defineProps({
  eventContactId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t } = useI18n();

const DEFAULT_FORM = {
  type: undefined,
  value: undefined,
  description: undefined,
};

const form = ref({
  ...DEFAULT_FORM,
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { createEventContact, updateEventContact, getEventContactById } =
  useApiEventContact();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventContactId) {
      // edit
      const { error, data } = await updateEventContact(props.eventContactId, {
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
          toast.success('Event contact updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventContact({
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
          toast.success('Event contact created!');
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

const eventContact = ref<EventContact>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventContactById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      eventContact.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.eventContactId) {
      void onGetDataById(props.eventContactId);
    }
  },
);
</script>
