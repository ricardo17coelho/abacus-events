<template>
  <v-select
    chips
    :items="itemsFormatted"
    :label="t('labels.parking_lot')"
    name="field-parking-lot"
    v-bind="$attrs"
  >
  </v-select>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import useApiParkingLot from '@/api/parking-lots.ts';
import type { ParkingLot } from '@/api/types/ParkingLot.ts';

const { t } = useI18n();

const items = ref<ParkingLot[]>([]);

const { getParkingLots } = useApiParkingLot();

async function onGetAll() {
  const { data, error } = await getParkingLots();

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      items.value = data;
    }
  }
}
onGetAll();

const itemsFormatted = computed(() =>
  items.value.map((i) => {
    return {
      value: i.id,
      title: showDefaultTranslationOrEmpty(i.title),
    };
  }),
);
</script>
