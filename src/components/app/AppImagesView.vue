<template>
  <template v-if="images.length">
    <slot name="activator" :on-click="show" />
    <vue-easy-lightbox
      :imgs="imgsRef"
      :index="indexRef"
      :visible="visibleRef"
      @hide="onEasyLightBoxHide"
    />
  </template>
  <template v-else>
    <slot />
    <slot name="activator" />
  </template>
</template>

<script setup lang="ts">
import VueEasyLightbox, { useEasyLightbox } from 'vue-easy-lightbox';

const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  initIndex: {
    type: Number,
    default: 0,
  },
});

const model = defineModel({ type: Boolean, default: false });

const {
  // methods
  show,
  onHide,
  // refs
  visibleRef,
  indexRef,
  imgsRef,
} = useEasyLightbox({
  // src / src[]
  imgs: props.images,
  // initial index
  initIndex: props.initIndex,
});

watch(
  () => props.initIndex,
  (newValue) => {
    if (newValue && !model.value) {
      indexRef.value = newValue;
    }
  },
  { immediate: true },
);

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
  },
);
</script>
