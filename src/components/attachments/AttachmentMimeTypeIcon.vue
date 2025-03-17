<template>
  <v-avatar v-if="attachment" tile>
    <AppImagesView v-if="isImage" :images="[attachment.url]">
      <template #activator="activatorProps">
        <v-img v-bind="activatorProps" :src="attachment.url"></v-img>
      </template>
    </AppImagesView>
    <v-icon v-else>{{ icon }}</v-icon>
  </v-avatar>
</template>

<script setup lang="ts">
import type { Attachment } from '@/api/types/Attachment.ts';
import AppImagesView from '@/components/app/AppImagesView.vue';

const props = defineProps({
  attachment: {
    type: Object as PropType<Attachment>,
    default: undefined,
  },
});

const icon = computed(() => {
  switch (props.attachment?.mime_type) {
    case 'application/pdf':
      return 'mdi-file-pdf-box';

    // no default
  }
});

const isImage = computed(() => props.attachment?.mime_type.startsWith('image'));
</script>

<style scoped></style>
