<template>
  <v-card v-if="parkingLot" border flat width="100%">
    <v-card-item :title="showDefaultTranslationOrEmpty(parkingLot.title)">
      <template #subtitle>
        <v-chip
          :href="parkingLot.location_url || undefined"
          prepend-icon="mdi-home-map-marker"
          size="small"
        >
          {{ parkingLot.location }}
        </v-chip>
      </template>
      <template #append>
        <slot name="actions" />
        <v-chip :color="getStatusColor(parkingLot)">
          {{ getParkingLotStatusText(parkingLot) }}
        </v-chip>
      </template>
    </v-card-item>

    <v-divider />

    <v-card-text class="text-medium-emphasis pa-6">
      <div class="text-h6 mb-6">
        <v-icon>mdi-car</v-icon>
        {{ t('labels.n_of_parking_spaces') }}
      </div>
      <div class="text-h4 font-weight-black mb-4">
        {{ parkingLot.filled_slots }} / {{ parkingLot.total_slots }}
      </div>

      <v-progress-linear
        bg-color="surface-variant"
        class="mb-6"
        :color="getStatusColor(parkingLot)"
        height="10"
        :model-value="
          calculatePercentage(parkingLot.filled_slots, parkingLot.total_slots)
        "
        rounded="pill"
      />
    </v-card-text>
    <slot />
  </v-card>
</template>

<script setup lang="ts">
import useParkingLot from '@/composables/parking-lot';
import { type ParkingLot } from '@/api/types/ParkingLot';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';
import { useI18n } from 'vue-i18n';

defineProps({
  parkingLot: {
    type: Object as PropType<ParkingLot>,
    default: () => ({}),
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
  hideFullText: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();

const { calculatePercentage, getStatusColor, getParkingLotStatusText } =
  useParkingLot();
</script>
