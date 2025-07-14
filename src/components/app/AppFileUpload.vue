<template>
  <div>
    <!-- Where the Uppy Dashboard will be rendered -->
    <div ref="dashboardContainer" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { PropType } from 'vue';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';
import useApi from '@/composables/api.js';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css';

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
  bucket: { type: String, required: true },
  folderPath: { type: String, required: true },
  maxFiles: { type: Number, default: 5 },
  allowedFileTypes: {
    type: Array as PropType<string[]>,
    default: () => ['image/*'],
  },
  onSave: {
    type: Function as PropType<
      (files: Partial<UploadedAttachment>[]) => Promise<void>
    >,
    default: undefined,
  },
});

const emit = defineEmits<{
  (e: 'upload:success', files: Partial<UploadedAttachment>[]): void;
  (e: 'upload:error', error: Error): void;
}>();

const dashboardContainer = ref<HTMLDivElement | null>(null);
let uppyInstance: Uppy.Uppy | null = null;

const { uploadImg } = useApi();

const startUpload = async () => {
  if (!uppyInstance) return;
  uploading.value = true;

  const files = uppyInstance.getFiles();
  const uploadedAttachments: Partial<UploadedAttachment>[] = [];

  for (const file of files) {
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
      display_name: file.meta?.name || file.name,
      mime_type: file.type ?? '',
      size: file.size ?? 0,
      name: data.fileName ?? '',
      extension: file.extension ?? '',
    });
  }

  if (props.onSave) {
    await props.onSave(uploadedAttachments);
  }

  emit('upload:success', uploadedAttachments);
  uploading.value = false;
  uppyInstance.clear();
};

onMounted(() => {
  if (!dashboardContainer.value) return;

  uppyInstance = new Uppy({
    autoProceed: false,
    restrictions: {
      maxNumberOfFiles: props.maxFiles,
      allowedFileTypes: props.allowedFileTypes,
    },
    meta: {
      name: '',
    },
  });

  uppyInstance.use(Dashboard, {
    inline: true,
    target: dashboardContainer.value,
    showLinkToFileUploadResult: false,
    showProgressDetails: true,
    note: 'Drag & drop files here or click to browse',
    proudlyDisplayPoweredByUppy: false,
    height: 400,
    metaFields: [
      {
        id: 'name',
        name: 'File Name',
        placeholder: 'Enter a name for the file',
      },
    ],
  });

  uppyInstance.use(ImageEditor, {
    target: Dashboard,
    quality: 0.9,
    cropperOptions: {
      viewMode: 1,
    },
  });

  uppyInstance.on('complete', startUpload);
});

onBeforeUnmount(() => {
  if (!uppyInstance) return;

  uppyInstance.off('complete', startUpload);
  uppyInstance.destroy();
});
</script>
