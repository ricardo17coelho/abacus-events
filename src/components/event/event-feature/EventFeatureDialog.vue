<template>
  <UiDialog v-model="model" max-width="600" :title="t('labels.event_feature')">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <EventFeatureForm
        v-if="currentEvent"
        ref="formRef"
        v-model="form"
        :disabled-features-types="currentEventFeaturesTypes"
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
import EventFeatureForm from './EventFeatureForm.vue';
// apis
import useApiEventFeature from '@/api/event-feature.ts';
// types & constants
import type { EventFeature } from '@/api/types/EventFeature.ts';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
// utils
import { merge2ObjectsIfKeysExists } from '@/utils/merge.ts';
import { clone } from '@/utils/clone.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { requireInjection } from '@/utils/injection.ts';

const props = defineProps({
  eventFeatureId: {
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
  description: {
    [locale.value]: '',
  },
  feature_id: undefined,
  icon: undefined,
  enabled: true,
};

const form = ref({
  ...DEFAULT_FORM,
});

const { createEventFeature, updateEventFeature, getEventFeatureById } =
  useApiEventFeature();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventFeatureId) {
      // edit
      const { error, data } = await updateEventFeature(props.eventFeatureId, {
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
          toast.success('Event feature updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventFeature({
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
          toast.success('Event feature created!');
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

const eventFeature = ref<EventFeature>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventFeatureById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      eventFeature.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.eventFeatureId) {
      void onGetDataById(props.eventFeatureId);
    }
  },
);

const currentEventFeaturesTypes = computed(() =>
  currentEvent.value?.features
    .filter((feature) => feature.feature_id !== eventFeature.value?.feature_id)
    .map((feature) => feature.feature_id),
);
</script>
