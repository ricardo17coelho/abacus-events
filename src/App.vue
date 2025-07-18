<template>
  <v-app>
    <router-view />
    <Toaster position="top-right" rich-colors />
    <SWReloadPrompt />
  </v-app>
</template>
<script lang="ts" setup>
import 'vue-sonner/style.css';
import { Toaster } from 'vue-sonner';
import { useGoogleAnalytics } from '@/plugins/google-analytics';
import { isProdEnv } from './utils';
import SWReloadPrompt from '@/components/SWReloadPrompt.vue';

if (isProdEnv()) {
  console.log('init google analytics');
  // Initialize Google Analytics with tracking ID
  useGoogleAnalytics(import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID);
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  min-height: 100%;
}
</style>
