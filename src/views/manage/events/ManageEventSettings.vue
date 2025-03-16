<template>
  <v-container
    v-if="currentEvent"
    class="d-flex justify-center flex-column ga-10 ma-0"
    fluid
  >
    <ManageEventFeatures />
  </v-container>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import ManageEventFeatures from '@/views/manage/events/ManageEventFeatures.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
