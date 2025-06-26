<template>
  <v-card
    v-if="file"
    border
    class="d-flex flex-column"
    flat
    height="250"
    rounded="lg"
    width="200"
    v-bind="$attrs"
  >
    <VSheet class="bg-grey-lighten-4 d-flex flex-column" height="100%">
      <VSheet class="d-flex justify-space-between" color="transparent" />

      <div class="d-flex justify-center align-center flex-fill ma-4">
        <v-icon v-if="file.mime_type === 'application/pdf'" size="100">
          mdi-file-pdf-box
        </v-icon>
        <v-img v-else :src="file.url"> </v-img>
      </div>
    </VSheet>
    <v-list-item slim>
      <template #title>
        {{ file.display_name }}
      </template>

      <template #subtitle>
        <v-chip color="primary" density="compact">
          {{ file.extension }}
        </v-chip>
      </template>
    </v-list-item>
  </v-card>
</template>

<script setup lang="ts">
import type { EventFile } from '@/api/types/EventFile.ts';

defineProps({
  file: {
    type: Object as PropType<EventFile>,
    default: () => ({}),
  },
});
</script>
