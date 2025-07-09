<template>
  <EventFeatureDisplayCard
    v-if="
      currentEvent &&
      hasEventFeature(currentEvent, 'PARKING') &&
      currentEvent.parking_lots.length
    "
    :feature="getEventFeatureIfExists(currentEvent, 'PARKING')"
  >
    <v-card-text>
      <LayoutEvent04SharedTabParking />
    </v-card-text>
  </EventFeatureDisplayCard>
</template>

<script setup lang="ts">
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import EventFeatureDisplayCard from '@/components/event/event-feature/event-feature-display/EventFeatureDisplayCard.vue';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import LayoutEvent04SharedTabParking from '@/layouts/event/LayoutEvent04/shared/LayoutEvent04SharedTabParking.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
