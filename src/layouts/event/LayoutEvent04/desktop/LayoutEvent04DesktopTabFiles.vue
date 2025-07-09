<template>
  <EventFeatureDisplayCard
    v-if="
      currentEvent &&
      hasEventFeature(currentEvent, 'FILES') &&
      currentEvent.files.length
    "
    :feature="getEventFeatureIfExists(currentEvent, 'FILES')"
  >
    <v-card-text>
      <LayoutEvent04SharedTabFiles />
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
import LayoutEvent04SharedTabFiles from '@/layouts/event/LayoutEvent04/shared/LayoutEvent04SharedTabFiles.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
