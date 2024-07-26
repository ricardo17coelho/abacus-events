<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h1 class="text-h5 text-md-h4 font-medium">
          Sommer Party Parking
          <span class="prevent-select" @click="basic"> 🎉 </span>
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="parkingLot in parkingLotsSorted"
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
import ParkingLotCard from '@/components/ParkingLotCard.vue';
import useConfetti from '@/composables/confetti';
import { type ParkingLot, type ParkingLotStatus } from '@/types/ParkingLot';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { supabase } from '@/services/supabase';
import useParkingLot from '@/composables/parking-lot';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLotStatus } = useParkingLot();

const parkingLotsSorted = computed(() => {
  const orderStatus: ParkingLotStatus[] = ['FREE', 'ALMOST_FULL', 'FULL'];
  return parkingLots.value
    .slice(0)
    .sort(
      (x, y) =>
        orderStatus.indexOf(getParkingLotStatus(x)) -
        orderStatus.indexOf(getParkingLotStatus(y))
    );
});

const { getParkingLots } = useApiParkingLot();

const { basic } = useConfetti();

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
  console.warn('subscription', subscription);
  onUnmounted(() => {
    supabase().removeChannel(subscription);
  });
});
</script>
