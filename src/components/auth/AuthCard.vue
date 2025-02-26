<template>
  <v-card class="px-0" variant="flat">
    <v-card-title v-if="title || $slots.title" class="px-0">
      {{ title }}
    </v-card-title>
    <v-card-subtitle v-if="subtitle || $slots.subtitle" class="px-0">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text class="px-0">
      <slot />
    </v-card-text>
    <template v-if="$slots.actions" #actions>
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
