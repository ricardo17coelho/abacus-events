<template>
  <div
    v-if="
      currentEvent &&
      hasEventFeature(currentEvent, 'PARKING') &&
      currentEvent.parking_lots.length
    "
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'PARKING')?.id}`"
  >
    <EventFeatureDisplayCard
      :feature="getEventFeatureIfExists(currentEvent, 'PARKING')"
    >
      <v-card-text>
        <v-row>
          <v-col
            v-for="parkingLot in currentEvent.parking_lots"
            :key="parkingLot.id"
            cols="12"
            lg="4"
          >
            <ParkingLotCard :parking-lot="parkingLot" />
          </v-col>
        </v-row>
      </v-card-text>
    </EventFeatureDisplayCard>
  </div>
</template>

<script setup lang="ts">
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import EventFeatureDisplayCard from '@/components/event/event-feature/event-feature-display/EventFeatureDisplayCard.vue';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import ParkingLotCard from '@/components/parking-lot/ParkingLotCard.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
