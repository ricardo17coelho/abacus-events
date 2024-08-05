<template>
  <slot name="activator" :onClick="show"></slot>

  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="imgsRef"
    :index="indexRef"
    @hide="onHide"
  />
</template>

<script setup lang="ts">
import VueEasyLightbox, { useEasyLightbox } from 'vue-easy-lightbox';

const {
  // methods
  show,
  onHide,
  // refs
  visibleRef,
  indexRef,
  imgsRef
} = useEasyLightbox({
  // src / src[]
  imgs: ['/images/plan.png'],
  // initial index
  initIndex: 0
});
</script>
