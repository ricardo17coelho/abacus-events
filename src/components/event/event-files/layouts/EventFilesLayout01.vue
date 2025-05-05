<template>
  <v-row>
    <v-col v-for="file in filesPDF" :key="file.id">
      <AppPdfDialog v-if="isPdf(file) && file.url" :pdf-url="file.url">
        <template #activator="{ props: ActivatorProps }">
          <EventFilesCard v-bind="ActivatorProps" :file="file" />
        </template>
      </AppPdfDialog>
    </v-col>

    <AppImagesView :images="filesImageUrls">
      <template #activator="ActivatorProps">
        <v-col v-for="image in filesIMAGE" :key="image.id">
          <EventFilesCard v-bind="ActivatorProps" :file="image" />
        </v-col>
      </template>
    </AppImagesView>
  </v-row>
</template>

<script setup lang="ts">
import type { EventFile } from '@/api/types/EventFile.ts';
import { isPdf } from '@/utils/attachments/utils.ts';
import AppPdfDialog from '@/components/app/AppPdfDialog.vue';
import AppImagesView from '@/components/app/AppImagesView.vue';
import EventFilesCard from '@/components/event/event-files/EventFilesCard.vue';

const props = defineProps({
  files: {
    type: Array as PropType<EventFile[]>,
    default: () => [],
  },
});

const filesPDF = computed(() => props.files.filter((i) => isPdf(i)));

const filesIMAGE = computed(() => props.files.filter((i) => !isPdf(i)));

const filesImageUrls = computed(() => filesIMAGE.value.map((a) => a.url));
</script>
