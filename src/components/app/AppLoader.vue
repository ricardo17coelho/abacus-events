<template>
  <ContainerCentered>
    <AppLoadingIcon
      class="mx-auto"
      :style="{
        width: `${width}px`
      }"
    />
  </ContainerCentered>
</template>

<script setup lang="ts">
import AppLoadingIcon from '@/components/app/AppLoadingIcon.vue';
import ContainerCentered from '../containers/ContainerCentered.vue';

defineProps({
  width: {
    type: Number,
    default: 48
  }
});
</script>
