<template>
  <v-card v-if="parkingLot" class="mx-auto" max-width="500" border flat>
    <v-list-item class="px-6" height="88">
      <template #title>
        {{ parkingLot.name }}
        <div>
          <v-chip prepend-icon="mdi-home-map-marker" size="small">
            {{ parkingLot.location }}
          </v-chip>
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
          calculatePercentage(parkingLot.filled_slots, parkingLot.total_slots)
        "
        rounded="pill"
      ></v-progress-linear>
    </v-card-text>
    <slot></slot>
  </v-card>
</template>

<script setup lang="ts">
import useParkingLot from '@/composables/parking-lot';
import { type ParkingLot } from '@/types/ParkingLot';

defineProps({
  parkingLot: {
    type: Object as PropType<ParkingLot>,
    default: () => ({})
  },
  hideIcon: {
    type: Boolean,
    default: false
  },
  hideFullText: {
    type: Boolean,
    default: false
  }
});

const { calculatePercentage, getStatusColor, getParkingLotStatusText } =
  useParkingLot();
</script>
