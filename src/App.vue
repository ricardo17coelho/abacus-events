<template>
  <v-app>
    <router-view />
    <Toaster position="top-right" rich-colors />
  </v-app>
</template>
<script lang="ts" setup>
import 'vue-sonner/style.css';
import { Toaster } from 'vue-sonner';
</script>

<style>
html,
body,
#app {
  height: 100%;
  min-height: 100%;
}
</style>
