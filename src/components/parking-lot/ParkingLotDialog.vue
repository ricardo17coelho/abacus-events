<template>
  <AppDialog v-model="model" max-width="600" :title="t('labels.parking_lot')">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <ParkingLotForm ref="formRef" v-model="form" />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ t('buttons.save') }}
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
  location: '',
  location_url: '',
  total_slots: 0,
  filled_slots: 0,
};

const form = ref({
  ...DEFAULT_FORM,
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
        form.value,
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
  },
);
</script>
