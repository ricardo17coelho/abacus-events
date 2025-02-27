<template>
  <v-dialog
    v-model="model"
    :fullscreen="fullscreen"
    :height="fullscreen || xs ? '100%' : height"
    :max-height="fullscreen || xs ? '100%' : maxHeight"
    :max-width="fullscreen || xs ? '100%' : maxWidth"
    scrollable
    transition="dialog-bottom-transition"
    :width="fullscreen || xs ? '100%' : height"
    v-bind="$attrs"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <v-card
      class="mx-auto"
      flat
      :prepend-icon="icon"
      :title="title"
      width="100%"
    >
      <template #append>
        <v-btn
          v-if="showFullscreen"
          :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
          size="small"
          @click="fullscreen = !fullscreen"
        />
        <v-spacer />
        <v-btn icon="$close" size="small" @click="model = false" />
      </template>

      <v-card-text>
        <slot v-if="loading" name="loading">
          <div class="text-center">
            <div>
              <AppLoader />
            </div>
            <div>
              {{ loadingText }}
            </div>
          </div>
        </slot>
        <slot v-else name="content" />
      </v-card-text>

      <v-card-actions v-if="!loading">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import AppLoader from './AppLoader.vue';
import { useDisplay } from 'vuetify';

defineProps({
  title: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
  maxHeight: {
    type: [Number, String],
    default: undefined,
  },
  minHeight: {
    type: [Number, String],
    default: undefined,
  },
  maxWidth: {
    type: [Number, String],
    default: undefined,
  },
  showFullscreen: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({
  type: Boolean,
  default: false,
});
const fullscreen = defineModel('fullscreen', { type: Boolean, default: false });

const { xs } = useDisplay();
</script>

<style scoped>
.v-dialog > .v-overlay__content > .v-card > .v-card-item + .v-card-text,
.v-dialog > .v-overlay__content > form > .v-card > .v-card-item + .v-card-text {
  padding-top: 8px;
}
</style>
