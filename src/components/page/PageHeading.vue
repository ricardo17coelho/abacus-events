<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <slot name="title">
        <h1 class="text-h4">{{ title }}</h1>
      </slot>

      <div class="d-flex ga-2">
        <slot name="actions"></slot>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: undefined,
  },
});
</script>
