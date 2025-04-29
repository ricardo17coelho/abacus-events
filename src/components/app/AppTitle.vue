<template>
  <v-container class="text-h5 text-md-h4 font-weight-medium px-0">
    <slot name="title">
      <span v-if="title">
        {{ title }}
      </span>
      <slot />
    </slot>
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
