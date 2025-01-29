<template>
  <AppImagesView :images="images">
    <template #activator="activatorProps">
      <v-row
        :class="{
          'justify-center': images.length <= 2,
          'justify-start': images.length > 2
        }"
        align="center"
      >
        <v-col
          v-for="image in images"
          :key="image"
          cols="3"
          align="center"
        >
          <v-hover>
            <template #default="{ isHovering, props: hoverProps }">
              <v-img
                v-bind="{ ...activatorProps, ...hoverProps }"
                :src="image"
                cover
                class="cursor-pointer"
                :class="{ 'elevation-10': isHovering }"
                max-width="150"
              >
                <template #placeholder>
                  <v-row
                    align="center"
                    class="fill-height ma-0"
                    justify="center"
                  >
                    <v-progress-circular
                      color="grey-lighten-5"
                      indeterminate
                    />
                  </v-row>
                </template>
              </v-img>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </template>
  </AppImagesView>
</template>

<script setup lang="ts">
import AppImagesView from './AppImagesView.vue';

defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => []
  }
});
</script>
