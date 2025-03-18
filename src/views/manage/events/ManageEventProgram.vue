<template>
  <v-container
    v-if="currentEvent"
    class="d-flex justify-center flex-column ga-10 ma-0"
    fluid
  >
    <AppStateSoon />
  </v-container>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import AppStateSoon from '@/components/app/AppStateSoon.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
