<template>
  <VOverlay
    v-model="isLoading"
    class="align-center justify-center text-center"
    contained
    :opacity="opacity"
  >
    <UiLoaderAnimation />
    <div>
      {{ loadingMsg }}
    </div>
    <slot></slot>
  </VOverlay>
</template>

<script lang="ts" setup>
import { VOverlay } from 'vuetify/components';
import UiLoaderAnimation from './UiLoaderAnimation.vue';
// utilities
import { useLoader } from './loader';

defineProps({
  opacity: {
    type: String,
    default: '0.1',
  },
  height: {
    type: Number,
    default: 64,
  },
  width: {
    type: Number,
    default: 64,
  },
  color: {
    type: String,
    default: '#5D4AC6',
  },
});

const { isLoading, loadingMsg, show, hide } = useLoader();

defineExpose({ show, hide });
</script>
