<template>
  <Dashboard
    :height="250"
    :inline="true"
    :uppy="uppyInstance"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { Dashboard } from '@uppy/vue';
import Uppy from '@uppy/core';
import useApi from '@/composables/api.js';

// Don't forget the CSS: core and UI components + plugins you are using
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

export type UploadedAttachment = {
  display_name: string;
  path: string;
  mime_type: string;
  size: number;
  name: string;
  url: string;
  extension: string;
};

const uploading = ref(false);

const props = defineProps({
  bucket: { type: String, required: true }, // Supabase Storage bucket name
  folderPath: { type: String, required: true }, // Folder path inside the bucket
  maxFiles: { type: Number, default: 5 }, // Max files to upload
  allowedFileTypes: {
    type: Array as PropType<string[]>,
    default: () => ['image/*'],
  }, // Max files to upload
  onSave: { type: Function, default: undefined }, // Event ID (if saving to DB)
});

const emit = defineEmits(['upload:success', 'upload:error']);

const uppyInstance = new Uppy({
  restrictions: {
    maxNumberOfFiles: props.maxFiles,
    allowedFileTypes: props.allowedFileTypes,
  },
  autoProceed: false,
});

const { uploadImg } = useApi();

const startUpload = async () => {
  uploading.value = true;
  const files = uppyInstance.getFiles();
  const uploadedAttachments: Partial<UploadedAttachment[]> = [];

  for (const file of files) {
    // Upload to Supabase Storage
    const { data, error } = await uploadImg(
      file.data,
      props.bucket,
      props.folderPath,
    );

    if (error) {
      console.error('Upload error:', error.message);
      emit('upload:error', error);
      continue;
    }

    uploadedAttachments.push({
      path: data.path,
      url: data.publicUrl,
      display_name: file.name ?? '',
      mime_type: file.type ?? '',
      size: file.size ?? 0,
      name: data.fileName ?? '',
      extension: file.extension ?? '',
    });
  }

  // Save to database if enabled
  if (props.onSave !== undefined) {
    await props.onSave(uploadedAttachments);
  }

  // Emit success event
  emit('upload:success', uploadedAttachments);

  uploading.value = false;
  uppyInstance.clear();
};

// 🔥 Listen for when users click the upload button inside the Uppy Dashboard UI
onMounted(() => {
  uppyInstance.on('complete', startUpload);
});

onBeforeUnmount(() => {
  uppyInstance.off('complete', startUpload);
  uppyInstance.destroy();
});
</script>
