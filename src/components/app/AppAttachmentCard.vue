<template>
  <v-card
    v-if="attachment"
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
        <v-icon v-if="attachment.mime_type === 'application/pdf'" size="100">
          mdi-file-pdf-box
        </v-icon>
        <v-img v-else :src="attachment.url">
          <slot name="image-default"></slot>
        </v-img>
      </div>
    </VSheet>
    <v-list-item slim>
      <template #title>
        <span v-tooltip="attachment.display_name">
          {{ attachment.display_name }}
        </span>
      </template>

      <template #subtitle>
        <v-chip color="primary" density="compact">
          {{ attachment.extension }}
        </v-chip>
      </template>
    </v-list-item>
  </v-card>
</template>

<script setup lang="ts">
import type { Attachment } from '@/api/types/Attachment.ts';

defineProps({
  attachment: {
    type: Object as PropType<Attachment>,
    default: () => ({}),
  },
});
</script>
