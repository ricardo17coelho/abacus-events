<template>
  <AppImagesView :images="images">
    <template #activator="activatorProps">
      <div class="d-flex">
        <v-img
          v-for="image in images"
          v-bind="activatorProps"
          :key="image"
          class="cursor-pointer"
          :src="image"
        >
          <template #placeholder>
            <v-row align="center" class="fill-height ma-0" justify="center">
              <v-progress-circular color="grey-lighten-5" indeterminate />
            </v-row>
          </template>
        </v-img>
      </div>
    </template>
  </AppImagesView>
</template>

<script setup lang="ts">
import AppImagesView from './AppImagesView.vue';

defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
</script>
