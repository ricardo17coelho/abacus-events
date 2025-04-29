<template>
  <v-dialog v-model="model" scrollable>
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>

    <v-card>
      <LayoutEvent />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import LayoutEvent from '@/layouts/event/LayoutEvent.vue';

const model = defineModel({ type: Boolean, default: false });
</script>
