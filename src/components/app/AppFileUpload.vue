<template>
  <Dashboard height="250" inline :uppy="uppyInstance" width="100%" />
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onBeforeUnmount, ref } from 'vue';
import { Dashboard } from '@uppy/vue';
import Uppy from '@uppy/core';
import useApi from '@/composables/api.js';

// Don't forget the CSS: core and UI components + plugins you are using
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const uploading = ref(false);

const props = defineProps({
  bucket: { type: String, required: true }, // Supabase Storage bucket name
  folderPath: { type: String, required: true }, // Folder path inside the bucket
  maxFiles: { type: Number, default: 5 }, // Max files to upload
  onSave: { type: Function, default: undefined }, // Event ID (if saving to DB)
});

const emit = defineEmits(['upload:success', 'upload:error']);

const uppyInstance = new Uppy({
  restrictions: {
    maxNumberOfFiles: props.maxFiles,
    allowedFileTypes: ['image/*'],
  },
  autoProceed: false,
});

const { uploadImg } = useApi();

const startUpload = async () => {
  console.warn('startUpload');
  uploading.value = true;
  const files = uppyInstance.getFiles();
  const uploadedImages = [];

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

    uploadedImages.push({
      path: data.path,
      url: data.publicUrl,
    });
  }

  // Save to database if enabled
  if (props.onSave !== undefined) {
    await props.onSave(uploadedImages);
  }

  // Emit success event
  emit('upload:success', uploadedImages);

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
