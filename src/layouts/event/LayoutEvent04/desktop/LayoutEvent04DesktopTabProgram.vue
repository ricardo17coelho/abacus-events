<template>
  <EventFeatureDisplayCard
    v-if="currentEvent && hasEventFeature(currentEvent, 'PROGRAM')"
    :feature="getEventFeatureIfExists(currentEvent, 'PROGRAM')"
  >
    <v-card-text>
      <LayoutEvent04SharedTabProgram
        v-if="currentEvent && hasEventFeature(currentEvent, 'PROGRAM')"
      />
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
import LayoutEvent04SharedTabProgram from '@/layouts/event/LayoutEvent04/shared/LayoutEvent04SharedTabProgram.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
