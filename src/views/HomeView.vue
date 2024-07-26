<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h1 class="text-h5 text-md-h4 font-medium">
          Sommer Party Parking
          <span @click="basic"> 🎉 </span>
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
        <v-card class="mx-auto" max-width="500" border flat>
          <v-list-item class="px-6" height="88">
            <template #title>
              {{ parkingLot.name }}
              <div>
                <v-chip prepend-icon="mdi-home-map-marker" size="small">{{
                  parkingLot.location
                }}</v-chip>
              </div>
            </template>

            <template #append>
              <v-chip :color="getStatusColor(parkingLot)"
                >{{ getParkingLotStatusText(parkingLot) }}
              </v-chip>
            </template>
          </v-list-item>

          <v-divider />

          <v-card-text class="text-medium-emphasis pa-6">
            <div class="text-h6 mb-6">
              <v-icon>mdi-car</v-icon>
              {{ $t('labels.n_of_parking_spaces') }}
            </div>
            <div class="text-h4 font-weight-black mb-4">
              {{ parkingLot.filled_slots }} / {{ parkingLot.total_slots }}
            </div>

            <v-progress-linear
              bg-color="surface-variant"
              :color="getStatusColor(parkingLot)"
              class="mb-6"
              height="10"
              :model-value="
                calculatePercentage(
                  parkingLot.filled_slots,
                  parkingLot.total_slots
                )
              "
              rounded="pill"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useApiParkingLot from '@/api/parking-lots';
import useConfetti from '@/composables/confetti';
import { PARKING_LOT_STATUS, type ParkingLot } from '@/types/ParkingLot';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots } = useApiParkingLot();

const { basic } = useConfetti();

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

function calculatePercentage(filledSlots: number, totalSlots: number) {
  return (filledSlots * 100) / totalSlots;
}

function getStatusColor(parkingLot: ParkingLot) {
  const status = getParkingLotStatus(parkingLot);
  switch (status) {
    case 'FULL':
      return 'error';
    case 'ALMOST_FULL':
      return 'warning';
    default:
      return 'green';
  }
}

function getParkingLotStatus(parkingLot: ParkingLot) {
  const i = calculatePercentage(
    parkingLot.filled_slots,
    parkingLot.total_slots
  );
  if (i >= 100) {
    return PARKING_LOT_STATUS.FULL;
  } else if (i > 80) {
    return PARKING_LOT_STATUS.ALMOST_FULL;
  }
  return PARKING_LOT_STATUS.FREE;
}

function getParkingLotStatusText(parkingLot: ParkingLot) {
  const status = getParkingLotStatus(parkingLot);
  switch (status) {
    case 'FULL':
      return t('labels.parking_lot.full');
    case 'ALMOST_FULL':
      return t('labels.parking_lot.almost_full');
    default:
      return t('labels.parking_lot.free');
  }
}
</script>
