<template>
  <v-card variant="flat" class="px-0">
    <v-card-title v-if="title || $slots.title" class="px-0">
      {{ title }}
    </v-card-title>
    <v-card-subtitle v-if="subtitle || $slots.subtitle" class="px-0">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text class="px-0">
      <slot></slot>
    </v-card-text>
    <template #actions v-if="$slots.actions">
      <slot name="actions" />
    </template>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  subtitle: string;
}>();
</script>
