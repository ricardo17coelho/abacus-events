<template>
  <router-view />
  <Toaster rich-colors position="top-right" />
</template>
<script lang="ts" setup>
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
