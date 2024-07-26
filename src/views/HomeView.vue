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
import ParkingLotCard from '@/components/ParkingLotCard.vue';
import useConfetti from '@/composables/confetti';
import { type ParkingLot } from '@/types/ParkingLot';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots } = useApiParkingLot();

const { basic } = useConfetti();

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

onMounted(() => {
  fetchData();
});
</script>
