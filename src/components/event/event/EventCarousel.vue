<template>
  <AppImagesView
    v-if="images.length > 0"
    :images="images"
    :init-index="carouselModel"
  >
    <template #activator="activatorProps">
      <v-carousel
        v-if="images.length > 1"
        v-model="carouselModel"
        cycle
        :height="height"
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="bannerUrl in images"
          v-bind="activatorProps"
          :key="bannerUrl"
          :src="bannerUrl"
        >
        </v-carousel-item>
      </v-carousel>
      <v-img
        v-else-if="images.length === 1"
        aspect-ratio="16/9"
        max-height="300"
        :src="images[0]"
      >
      </v-img>
    </template>
  </AppImagesView>
</template>

<script setup lang="ts">
import AppImagesView from '@/components/app/AppImagesView.vue';

defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  height: {
    type: [String, Number],
    default: 400,
  },
});

const carouselModel = ref(0);
</script>
