<template>
  <AppLoadingIcon
    class="mx-auto"
    :style="{
      width: `${width}px`
    }"
  />
</template>

<script setup lang="ts">
import AppLoadingIcon from '@/components/app/AppLoadingIcon.vue';

defineProps({
  width: {
    type: Number,
    default: 48
  }
});
</script>
