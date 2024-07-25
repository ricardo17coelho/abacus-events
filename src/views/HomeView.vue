<template>
  <v-container>
    <h1 class="text-3xl font-medium">Abacus SommerParty Parking</h1>

    <v-row>
      <v-col
        v-for="parkingLot in parkingLots"
        :key="parkingLot.id"
        cols="12"
        lg="6"
      >
        <v-card
          :title="parkingLot.name"
          :color="getStatusColor(parkingLot)"
          variant="tonal"
        >
          <template #subtitle>
            <v-chip>{{ parkingLot.location }}</v-chip>
          </template>
          <v-card-text>
            Anzahl Parkplätze
            {{ parkingLot.filled_slots }} von {{ parkingLot.total_slots }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useApiParkingLot from '@/api/parking-lots';
import type { ParkingLot } from '@/types/ParkingLot';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots } = useApiParkingLot();

async function onGetAllParkingLots() {
  const { data, error } = await getParkingLots();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    parkingLots.value = data;
  }
}

onMounted(() => onGetAllParkingLots());

function getStatusColor(parkingLot: ParkingLot) {
  const i = (parkingLot.filled_slots * 100) / parkingLot.total_slots;
  if (i >= 100) {
    return 'error';
  } else if (i > 80) {
    return 'warning';
  }
  return 'green';
}
</script>
