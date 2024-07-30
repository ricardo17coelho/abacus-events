<template>
  <h1 class="text-h5 text-md-h4 font-medium">
    <slot name="title">
      <span v-if="title">
        {{ title }}
      </span>
      <span v-else>
        Abacus Summer Party
        <span class="prevent-select" @click="basic"> 🎉 </span>
      </span>
    </slot>
    <slot></slot>
  </h1>
</template>

<script setup lang="ts">
import useConfetti from '@/composables/confetti';

defineProps({
  title: {
    type: String,
    default: undefined
  }
});

const { basic } = useConfetti();
</script>
