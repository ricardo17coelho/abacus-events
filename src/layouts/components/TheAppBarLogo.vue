<template>
  <router-link to="/">
    <v-img :height="height" src="/logos/abacus.svg" :width="width" />
  </router-link>
</template>
<script setup lang="ts">
const { width = 150, height = 40 } = defineProps<{
  width?: number | string;
  height?: number | string;
}>();
</script>
