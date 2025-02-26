<template>
  <v-container v-if="currentEvent">
    <v-row>
      <v-col align="center">
        <AppTitle show-go-home-button :title="t('title.parking')" />
      </v-col>
    </v-row>
    <v-alert border="start" class="my-6" density="compact" rounded="lg">
      <v-icon>mdi-information-variant-circle-outline</v-icon>
      {{ t('views.parking.alert_01') }}
    </v-alert>
    <v-row>
      <v-col
        v-for="parkingLot in currentEvent.parking_lots"
        :key="parkingLot.id"
        cols="12"
        lg="6"
      >
        <ParkingLotCard :parking-lot="parkingLot" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useApiParkingLot from '@/api/parking-lots';
import ParkingLotCard from '@/components/parking-lot/ParkingLotCard.vue';
import AppTitle from '@/components/app/AppTitle.vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { supabase } from '@/services/supabase';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const { t } = useI18n();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { getParkingLots } = useApiParkingLot();

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function mutateParkingLotById(id: string, payload: Record<any, any>) {
  if (!currentEvent.value) return;
  const idx = currentEvent.value.parking_lots.findIndex((i) => i.id === id);
  if (idx > -1) {
    Object.assign(currentEvent.value?.parking_lots[idx], payload);
  }
}

const fetchData = async () => {
  const { data, error } = await getParkingLots();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data && currentEvent.value) {
    currentEvent.value.parking_lots = data;
  }
};

const subscribeToChanges = () => {
  const channel = supabase
    .channel('parking_lots')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'parking_lots' },
      (payload) => {
        fetchData();
        if (payload.new) {
          mutateParkingLotById(payload.new.id, payload.new);
        }
      },
    )
    .subscribe();

  return channel;
};

onMounted(() => {
  const subscription = subscribeToChanges();
  onUnmounted(() => {
    supabase.removeChannel(subscription);
  });
});
</script>
