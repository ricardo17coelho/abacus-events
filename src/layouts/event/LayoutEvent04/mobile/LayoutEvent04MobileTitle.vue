<template>
  <h5 class="text-h5 mb-4 text-primary">
    <slot v-if="$slots.prepend || prependIcon" name="prepend">
      <v-icon>{{ prependIcon }}</v-icon>
    </slot>
    {{ title }}
    <slot name="append"></slot>
  </h5>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  prependIcon: {
    type: String,
    default: undefined,
  },
});
</script>
