<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <slot name="title">
        <div>
          <h6 v-if="caption" class="text-caption text-medium-emphasis">
            {{ caption }}
          </h6>
          <h4 v-if="title" class="text-h4">{{ title }}</h4>
          <h6 v-if="subtitle" class="text-h6 text-medium-emphasis">
            {{ subtitle }}
          </h6>
        </div>
      </slot>

      <div class="d-flex ga-2">
        <slot name="actions"></slot>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  subtitle: {
    type: String,
    default: undefined,
  },
  caption: {
    type: String,
    default: undefined,
  },
});
</script>
