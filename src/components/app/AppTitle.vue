<template>
  <div class="d-flex justify-space-between">
    <v-btn v-if="showGoHomeButton" exact icon="mdi-arrow-left" to="/" />
    <div class="d-flex justify-center flex-fill">
      <h1 class="text-h5 text-md-h4 font-medium">
        <slot name="title">
          <span v-if="title">
            {{ title }}
          </span>
          <span v-else>
            Abacus Events
            <span class="prevent-select" @click="basic"> 🎉 </span>
          </span>
        </slot>
      </h1>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import useConfetti from '@/composables/confetti';

defineProps({
  title: {
    type: String,
    default: undefined,
  },
  showGoHomeButton: {
    type: Boolean,
    default: false,
  },
});

const { basic } = useConfetti();
</script>
