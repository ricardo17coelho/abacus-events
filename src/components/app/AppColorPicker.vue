<template>
  <v-color-picker
    elevation="0"
    mode="hex"
    :modes="['hex']"
    show-swatches
    :swatches="swatches"
  />
</template>

<script setup lang="ts">
const swatches = [
  // Abacus
  ['#de323c', '#ffffff', '#282828'],
  // AbaNinja, AbaCloud, AbaMobile
  ['#128ef2', '#1677cb', '#ffa539'],
  // DeepCloud
  ['#ff2800', '#212529', '#f8f9fa'],
];
</script>
