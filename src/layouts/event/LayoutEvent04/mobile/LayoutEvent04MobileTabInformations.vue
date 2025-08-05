<template>
  <v-container
    v-if="currentEvent && feature && currentEvent.files.length"
    class="pa-0"
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

    <LayoutEvent04SharedTabInformations v-if="currentView === 'chips'" />
    <LayoutEvent04MobileTabInformationsPanels
      v-else-if="currentView === 'panels'"
    />
  </v-container>
</template>

<script setup lang="ts">
import { getEventFeatureIfExists } from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import LayoutEvent04SharedTabInformations from '@/layouts/event/LayoutEvent04/shared/LayoutEvent04SharedTabInformations.vue';
import LayoutEvent04MobileTabInformationsPanels from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTabInformationsPanels.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const feature = computed(() =>
  currentEvent.value
    ? getEventFeatureIfExists(currentEvent.value, 'INFORMATIONS')
    : undefined,
);

const currentView = ref<'chips' | 'panels'>('chips');
</script>
