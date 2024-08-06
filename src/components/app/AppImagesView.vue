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

const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});

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
  imgs: props.images,
  // initial index
  initIndex: 0
});
</script>
