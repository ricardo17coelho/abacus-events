<template>
  <v-card class="mx-auto" max-width="650" title="Events">
    <template #append>
      <v-btn icon="mdi-car" :to="{ name: 'manage-parking-lots' }"></v-btn>
    </template>
    <v-divider />

    <v-list lines="two">
      <template v-for="(parkingLot, i) in parkingLots" :key="parkingLot.id">
        <v-divider v-if="i !== 0" />

        <v-list-item link>
          <template #prepend>
            <v-avatar color="surface-light" size="64" tile> #TODO </v-avatar>
          </template>

          <v-list-item-subtitle class="text-caption mb-2">
            {{ showDefaultTranslationOrEmpty(parkingLot.title) }}
          </v-list-item-subtitle>

          <v-list-item-title class="text-subtitle-2 font-weight-bold">
            {{ parkingLot.location }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { useI18n } from 'vue-i18n';
import type { ParkingLot } from '@/api/types/ParkingLot.ts';
import useApiParkingLot from '@/api/parking-lots.ts';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots } = useApiParkingLot();

const fetchData = async () => {
  const { data, error } = await getParkingLots();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    parkingLots.value = data;
  }
};
fetchData();
</script>
