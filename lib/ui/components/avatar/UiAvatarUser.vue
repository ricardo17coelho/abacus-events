<template>
  <UiAvatar
    :color="color"
    icon="mdi-account"
    :name="name"
    :rounded="rounded"
    :size="size"
    v-bind="$attrs"
  >
  </UiAvatar>
</template>

<script lang="ts" setup>
// components
import UiAvatar from './UiAvatar.vue';

defineProps({
  name: {
    type: String,
    default: null,
  },
  rounded: {
    type: String,
    default: 'pill',
  },
  color: {
    type: String,
    default: 'primary',
  },
  size: {
    type: [String, Number],
    default: 36,
  },
});
</script>
