<template>
  <AppDialog v-model="model" max-width="600" :title="t('labels.parking_lot')">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <EventParkingLotForm ref="formRef" v-model="form" />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ t('actions.save') }}
      </VBtnPrimary>
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
// components
import AppDialog from '@/components/app/AppDialog.vue';
import EventParkingLotForm from './EventParkingLotForm.vue';
// apis
import useApiEventParkingLot from '@/api/event-parking-lots.ts';
// types & constants
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t } = useI18n();

const DEFAULT_FORM = {
  parking_lot_id: undefined,
};

const form = ref({
  ...DEFAULT_FORM,
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { createEventParkingLot } = useApiEventParkingLot();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  if (!currentEvent.value) return;
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    // add
    const { error, data } = await createEventParkingLot({
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
        toast.success('Parking lot added!');
      }
    }

    isLoading.value = false;
    model.value = false;
  } else {
    toast.error(t('errors.validation.invalid'));
    isLoading.value = false;
  }
}
</script>
