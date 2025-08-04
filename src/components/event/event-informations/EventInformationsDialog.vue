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
      <EventInformationsForm
        ref="formRef"
        v-model="form"
        :event-id="currentEvent!.id"
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
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import { merge2ObjectsIfKeysExists } from '@/utils/merge';
import useApiEventInformations from '@/api/event-informations.ts';
import type { EventInformation } from '@/api/types/EventInformation.ts';
import EventInformationsForm, {
  DEFAULT_FORM,
} from '@/components/event/event-informations/EventInformationsForm.vue';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const props = defineProps({
  eventId: {
    type: String,
    required: true,
  },
  eventInformationsId: {
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
  content: {
    [locale.value]: '',
  },
};

let form = reactive(structuredClone(DEFAULT_FORM_DATA));

const isLoading = ref(false);
const formRef = ref();

const {
  updateEventInformation,
  createEventInformation,
  getEventInformationById,
} = useApiEventInformations();

function onClearForm() {
  Object.assign(form, structuredClone(DEFAULT_FORM_DATA));
}

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventInformationsId) {
      // edit
      const { error, data } = await updateEventInformation(
        props.eventInformationsId,
        form,
      );

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          onClearForm();
          isLoading.value = false;
          toast.success('Information updated!');
          emit('success', data);
        }
      }
    } else {
      // add
      const { error, data } = await createEventInformation({
        ...form,
        event_id: props.eventId,
      });

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          onClearForm();
          toast.success('Information created!');

          emit('success', data);
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
      form = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM_DATA }, data);
    }
  }
  isLoadingItem.value = false;
}

watch(
  () => model.value,
  (newValue) => {
    if (newValue && props.eventInformationsId) {
      onGetCompanyInformationsById(props.eventInformationsId);
    } else if (!newValue) {
      item.value = undefined;
      onClearForm();
    }
  },
);
</script>
