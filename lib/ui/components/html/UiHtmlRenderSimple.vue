<template>
  <div
    :class="{ 'html-render': !unstyled }"
    v-html="getSanitizedHtml(content)"
  ></div>
</template>
<script setup lang="ts">
import { getSanitizedHtml } from '../../utils/html-sanitize';

defineProps({
  content: {
    type: String,
    default: undefined,
  },
  unstyled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped src="./html-style.scss"></style>
