<template>
  <v-container
    v-if="currentEvent && feature && currentEvent.files.length"
    class="pa-0"
  >
    <LayoutEvent04SharedTabParking />
  </v-container>
</template>

<script setup lang="ts">
import { getEventFeatureIfExists } from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import LayoutEvent04SharedTabParking from '@/layouts/event/LayoutEvent04/shared/LayoutEvent04SharedTabParking.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const feature = computed(() =>
  currentEvent.value
    ? getEventFeatureIfExists(currentEvent.value, 'PARKING')
    : undefined,
);
</script>
