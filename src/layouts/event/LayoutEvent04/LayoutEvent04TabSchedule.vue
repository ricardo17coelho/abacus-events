<template>
  <div
    v-if="currentEvent && hasEventFeature(currentEvent, 'SCHEDULE')"
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'SCHEDULE')?.id}`"
  >
    <EventFeatureDisplayCard
      :feature="getEventFeatureIfExists(currentEvent, 'SCHEDULE')"
    >
      <v-card-text>
        <EventScheduleDisplay01 />
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
import EventScheduleDisplay01 from '@/components/event/event-schedule/event-schedule-display/EventScheduleDisplay01.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
