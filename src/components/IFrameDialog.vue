<template>
  <UiDialog fullscreen>
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #content>
      <IFrameWrapper v-if="src" :src="src" />
    </template>
  </UiDialog>
</template>

<script lang="ts" setup>
import { UiDialog } from '@lib/ui';
import IFrameWrapper from './IFrameWrapper.vue';

defineProps({
  src: {
    type: String,
    default: undefined,
  },
});
</script>
