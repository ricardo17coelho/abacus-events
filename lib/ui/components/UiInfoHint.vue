<template>
  <v-tooltip :content-class="contentClass" max-width="200" v-bind="$attrs">
    <template #activator="{ props }">
      <v-icon-btn
        v-bind="props"
        :icon="icon"
        :size="size"
        @click.stop.prevent
      />
    </template>
    <template #default>
      <div v-html="getSanitizedHtml(text)"></div>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { getSanitizedHtml } from '@lib/ui';

defineProps({
  icon: {
    type: String,
    default: 'mdi-information-outline',
  },
  size: {
    type: String,
    default: 'small',
  },
  contentClass: {
    type: String,
    default: 'bg-white border',
  },
  text: {
    type: String,
    default: undefined,
  },
});
</script>
