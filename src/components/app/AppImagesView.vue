<template>
  <slot
    name="activator"
    :on-click="show"
  />

  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="imgsRef"
    :index="indexRef"
    @hide="onEasyLightBoxHide"
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

const model = defineModel({ type: Boolean, default: false });

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

function onEasyLightBoxHide() {
  onHide();
  model.value = false;
}

watch(
  () => model.value,
  (newValue) => {
    if (newValue) {
      show();
    }
  }
);
</script>
