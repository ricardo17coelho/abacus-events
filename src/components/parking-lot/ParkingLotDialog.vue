<template>
  <AppDialog v-model="model" :title="$t('labels.parking_lot')" max-width="600">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #content>
      <ParkingLotForm v-model="form" ref="formRef" />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ $t('buttons.save') }}
      </VBtnPrimary>
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
// components
import AppDialog from '@/components/app/AppDialog.vue';
import ParkingLotForm from './ParkingLotForm.vue';
// api's
import useApiParkingLot from '@/api/parking-lots';
// types & constants
import type { ParkingLot } from '@/api/types/ParkingLot';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
// utils
import { merge2ObjectsIfKeysExists } from '@/utils/merge';

const props = defineProps({
  parkingLotId: {
    type: String,
    default: undefined
  }
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t } = useI18n();

const DEFAULT_FORM = {
  name: '',
  location: '',
  location_url: '',
  total_slots: '',
  filled_slots: ''
};

const form = ref({
  ...DEFAULT_FORM
});

const { createParkingLot, updateParkingLot, getParkingLotById } =
  useApiParkingLot();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.parkingLotId) {
      // edit
      const { error, data } = await updateParkingLot(
        props.parkingLotId,
        form.value
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
          toast.success('Parking lot updated!');
        }
      }
    } else {
      // add
      const { error, data } = await createParkingLot(form.value);

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', data);
          form.value = { ...DEFAULT_FORM };
          toast.success('Parking lot created!');
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

const parkingLot = ref<ParkingLot>();
const isLoadingInitial = ref(false);

async function onGetCompanyBlogPostById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getParkingLotById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      parkingLot.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  (newValue) => {
    if (newValue && props.parkingLotId) {
      onGetCompanyBlogPostById(props.parkingLotId);
    }
  }
);
</script>
