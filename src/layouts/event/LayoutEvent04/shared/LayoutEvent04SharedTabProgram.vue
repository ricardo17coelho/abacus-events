<template>
  <div
    v-if="currentEvent && hasEventFeature(currentEvent, 'PROGRAM')"
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'PROGRAM')?.id}`"
  >
    <v-chip-group
      v-if="categories.length > 0"
      v-model="currentCategoryFilter"
      class="categories-chip-group"
      color="primary"
      mandatory
      mobile
    >
      <v-chip
        v-for="category in categories"
        :key="category.id"
        centered
        density="comfortable"
        filter
        :prepend-icon="category.icon"
        :text="showDefaultTranslationOrEmpty(category.title)"
        :value="category.id"
        variant="outlined"
      />
    </v-chip-group>
    <EventTimeline01 :date="currentEvent.date" :items="sortedItems" />
  </div>
</template>

<script setup lang="ts">
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import EventTimeline01 from '@/components/event/event-timeline/EventTimeline01.vue';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import useEventProgram from '@/composables/event-program.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
const { sortedItems, currentCategoryFilter, categories } = useEventProgram();
</script>
