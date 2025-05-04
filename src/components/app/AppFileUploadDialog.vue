<template>
  <UiDialog v-model="model" max-width="600">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <AppFileUpload
        :allowed-file-types="allowedFileTypes"
        :bucket="bucket"
        :folder-path="folderPath"
        :max-files="maxFiles"
        :on-save="onSave"
        @upload:success="onUploadSuccess"
      />
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
import { UiDialog } from '@lib/ui';
import AppFileUpload from '@/components/app/AppFileUpload.vue';

defineProps({
  bucket: { type: String, required: true }, // Supabase Storage bucket name
  folderPath: { type: String, required: true }, // Folder path inside the bucket
  maxFiles: { type: Number, default: 5 }, // Max files to upload
  allowedFileTypes: {
    type: Array as PropType<string[]>,
    default: () => ['image/*'],
  }, // Max files to upload
  onSave: { type: Function, default: undefined }, // Event ID (if saving to DB)
});

const model = defineModel({
  type: Boolean,
  default: false,
});

const emit = defineEmits(['upload:success', 'upload:error']);

function onUploadSuccess() {
  model.value = false;
  emit('upload:success');
}
</script>
