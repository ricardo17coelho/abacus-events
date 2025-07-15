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

<style lang="scss" scoped>
.html-render {
  color: inherit;

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-weight: bold;
  }

  :deep(h1) {
    font-size: 2em;
  }

  :deep(h2) {
    font-size: 1.75em;
  }

  :deep(h3) {
    font-size: 1.5em;
  }

  :deep(h4) {
    font-size: 1.25em;
  }

  :deep(h5) {
    font-size: 1em;
  }

  :deep(h6) {
    font-size: 0.875em;
  }

  :deep(p) {
    margin-bottom: 1em;
  }

  :deep(a) {
    color: #1e90ff;
    text-decoration: none;
  }

  :deep(a:hover) {
    text-decoration: underline;
  }

  :deep(ul),
  :deep(ol) {
    margin: 1em 0;
    padding-left: 1.5em;
  }

  :deep(ul) {
    list-style-type: disc;
  }

  :deep(ol) {
    list-style-type: decimal;
  }

  :deep(li) {
    margin-bottom: 0.5em;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1em 0;
  }

  :deep(blockquote) {
    margin: 1em 0;
    padding: 0.5em 1em;
    background-color: #f9f9f9;
    border-left: 4px solid #ccc;
  }

  :deep(code) {
    background-color: #f4f4f4;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    text-wrap: auto;
  }

  :deep(pre) {
    background-color: #f4f4f4;
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
  }

  :deep(th),
  :deep(td) {
    padding: 0.5em;
    border: 1px solid #ddd;
  }

  :deep(th) {
    background-color: #f4f4f4;
    font-weight: bold;
    text-align: left;
  }
}
</style>
