<template>
  <UiMenu :items="items">
    <template #activator="{ props }">
      <UiHtmlEditorToolbarBtn :icon="icon" v-bind="props" />
    </template>
  </UiMenu>
</template>
<script setup lang="ts">
import { type PropType } from 'vue';
// components
import { type MenuItem, UiMenu } from '../menu';
import UiHtmlEditorToolbarBtn from './UiHtmlEditorToolbarBtn.vue';

defineProps({
  icon: {
    type: String,
    default: undefined,
  },
  items: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});
</script>
