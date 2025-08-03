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
  --gray-1: #f5f5f5;
  --gray-2: #e0e0e0;
  --gray-3: #bdbdbd;
  --purple: #9c27b0;
  --purple-light: #e1bee7;
  --black: #212121;
  --white: #ffffff;

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
    margin: 1.5rem 0;
    font-size: 0.95rem;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    table-layout: auto;

    thead {
      background-color: #f8f8f8;
    }

    th,
    td {
      border: 1px solid #e0e0e0;
      text-align: left;
      padding: 12px 16px;
      vertical-align: top;
    }

    th {
      background-color: #f0f0f0;
      font-weight: 600;
      color: #333;
    }

    td {
      color: #444;
      background-color: #fafafa;
    }

    tr:nth-child(even) td {
      background-color: #f5f5f5;
    }

    p {
      margin: 0;
      line-height: 1.4;
      font-weight: bold;
    }
  }
}
</style>
