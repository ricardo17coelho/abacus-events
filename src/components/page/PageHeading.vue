<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <slot name="title">
        <div>
          <h4 class="text-h4">{{ title }}</h4>
          <h6 class="text-h6 text-medium-emphasis">{{ subtitle }}</h6>
        </div>
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
  subtitle: {
    type: String,
    default: undefined,
  },
});
</script>
