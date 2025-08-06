<template>
  <div
    v-if="currentEvent && hasEventFeature(currentEvent, 'INFORMATIONS')"
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'INFORMATIONS')?.id}`"
  >
    <LayoutEvent04TabInformationsPanels />
  </div>
</template>

<script setup lang="ts">
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import LayoutEvent04TabInformationsPanels from './LayoutEvent04TabInformationsPanels.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
