<template>
  <div
    v-if="currentEvent && hasEventFeature(currentEvent, 'INFORMATIONS')"
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'INFORMATIONS')?.id}`"
  >
    <div class="d-flex align-center justify-end py-2">
      <v-btn-toggle
        v-model="currentView"
        base-color="surface-light"
        class="bg-surface-light pa-1"
        color="black"
        density="compact"
      >
        <v-btn
          class="text-none flex-1-1-0"
          icon="mdi-list-box"
          value="panels"
        />

        <v-btn class="text-none flex-1-1-0" icon="mdi-list-box" value="chips" />
      </v-btn-toggle>
    </div>

    <LayoutEvent04TabInformationsChips v-if="currentView === 'chips'" />
    <LayoutEvent04TabInformationsPanels v-else-if="currentView === 'panels'" />
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
import LayoutEvent04TabInformationsChips from './LayoutEvent04TabInformationsChips.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
const currentView = ref<'chips' | 'panels'>('chips');
</script>
