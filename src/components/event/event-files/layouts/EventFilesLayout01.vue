<template>
  <v-row>
    <v-col v-for="file in filesPDF" :key="file.id" :cols="xs ? 12 : 'auto'">
      <AppPdfDialog v-if="isPdf(file) && file.url" :pdf-url="file.url">
        <template #activator="{ props: ActivatorProps }">
          <EventFilesCard v-bind="ActivatorProps" :file="file" />
        </template>
      </AppPdfDialog>
    </v-col>

    <v-col
      v-for="(image, idx) in filesIMAGE"
      :key="image.id"
      :cols="xs ? 12 : 'auto'"
    >
      <AppImagesView :images="filesImageUrls" :init-index="idx">
        <template #activator="ActivatorProps">
          <EventFilesCard v-bind="ActivatorProps" :file="image" />
        </template>
      </AppImagesView>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { EventFile } from '@/api/types/EventFile.ts';
import { isPdf } from '@/utils/attachments/utils.ts';
import AppPdfDialog from '@/components/app/AppPdfDialog.vue';
import AppImagesView from '@/components/app/AppImagesView.vue';
import EventFilesCard from '@/components/event/event-files/EventFilesCard.vue';
import { useDisplay } from 'vuetify';

const props = defineProps({
  files: {
    type: Array as PropType<EventFile[]>,
    default: () => [],
  },
});

const { xs } = useDisplay();

const filesPDF = computed(() => props.files.filter((i) => isPdf(i)));

const filesIMAGE = computed(() => props.files.filter((i) => !isPdf(i)));

const filesImageUrls = computed(() => filesIMAGE.value.map((a) => a.url));
</script>
