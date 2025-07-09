<template>
  <div
    v-if="
      currentEvent &&
      hasEventFeature(currentEvent, 'FILES') &&
      currentEvent.files.length
    "
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'FILES')?.id}`"
  >
    <EventFilesLayout01 :files="currentEvent.files" />
  </div>
</template>

<script setup lang="ts">
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';

import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import EventFilesLayout01 from '@/components/event/event-files/layouts/EventFilesLayout01.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
