<template>
  <router-view />
  <Toaster
    rich-colors
    position="top-right"
  />
</template>
<script lang="ts" setup>
import { Toaster } from 'vue-sonner';
import { useGoogleAnalytics } from '@/plugins/google-analytics';
import { isProdEnv } from './utils';

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
