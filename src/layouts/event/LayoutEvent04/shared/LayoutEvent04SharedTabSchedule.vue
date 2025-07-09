<template>
  <div
    v-if="currentEvent && hasEventFeature(currentEvent, 'SCHEDULE')"
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'SCHEDULE')?.id}`"
  >
    <EventScheduleDisplay01 />
  </div>
</template>

<script setup lang="ts">
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import EventScheduleDisplay01 from '@/components/event/event-schedule/event-schedule-display/EventScheduleDisplay01.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
