<template>
  <UiDialog v-model="model" :title="t('labels.person')" width="500">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #content>
      <EventPersonForm
        ref="formRef"
        v-model="form"
        :event-id="currentEvent?.id"
      />
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
import EventPersonForm from './EventPersonForm.vue';
// apis
import useApiEventPerson from '@/api/event-person.ts';
// composables
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { clone } from '@/utils/clone.ts';
import { merge2ObjectsIfKeysExists } from '@/utils/merge.ts';
import type { EventPerson } from '@/api/types/EventPerson.ts';

const props = defineProps({
  eventPersonId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t, locale } = useI18n();

const DEFAULT_FORM = {
  first_name: undefined,
  last_name: undefined,
  event_id: undefined,
  description: {
    [locale.value]: '',
  },
  bio: {
    [locale.value]: '',
  },
  avatar_url: undefined,
};

const form = ref({
  ...DEFAULT_FORM,
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { createEventPerson, updateEventPerson, getEventPersonById } =
  useApiEventPerson();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventPersonId) {
      // edit
      const { error, data } = await updateEventPerson(props.eventPersonId, {
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
          toast.success('Event person updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventPerson({
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
          toast.success('Event person created!');
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

const eventPerson = ref<EventPerson>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventPersonById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      eventPerson.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.eventPersonId) {
      void onGetDataById(props.eventPersonId);
    }
  },
);
</script>
