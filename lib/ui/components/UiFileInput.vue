<template>
  <input
    ref="inputRef"
    class="d-none"
    type="file"
    v-bind="$attrs"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['change']);

const inputRef = ref();

function click() {
  if (inputRef.value) {
    inputRef.value.click();
  }
}

function clear() {
  if (inputRef.value) {
    inputRef.value = '';
  }
}

function onChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files || !target.files[0]) return;
  emit('change', { file: target.files[0] });
}

defineExpose({ click, clear });
</script>
