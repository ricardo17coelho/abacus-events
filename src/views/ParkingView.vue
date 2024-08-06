<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <AppTitle :title="$t('title.parking')" />
      </v-col>
    </v-row>
    <v-alert class="my-6" border="start" rounded="lg" density="compact">
      <v-icon>mdi-information-variant-circle-outline</v-icon>
      {{ $t('views.parking.alert_01') }}
    </v-alert>
    <v-row>
      <v-col
        v-for="parkingLot in parkingLots"
        :key="parkingLot.id"
        cols="12"
        lg="6"
      >
        <ParkingLotCard :parking-lot="parkingLot"> </ParkingLotCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useApiParkingLot from '@/api/parking-lots';
import ParkingLotCard from '@/components/parking-lot/ParkingLotCard.vue';
import AppTitle from '@/components/app/AppTitle.vue';
import { type ParkingLot } from '@/api/types/ParkingLot';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { supabase } from '@/services/supabase';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots } = useApiParkingLot();

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function mutateParkingLotById(id: string, payload: Record<any, any>) {
  const idx = parkingLots.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    Object.assign(parkingLots.value[idx], payload);
  }
}

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

const subscribeToChanges = () => {
  const channel = supabase()
    .channel('parking_lots')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'parking_lots' },
      (payload) => {
        fetchData();
        if (payload.new) {
          mutateParkingLotById(payload.new.id, payload.new);
        }
      }
    )
    .subscribe();

  return channel;
};

onMounted(() => {
  fetchData();
  const subscription = subscribeToChanges();
  onUnmounted(() => {
    supabase().removeChannel(subscription);
  });
});
</script>
