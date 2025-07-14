<template>
  <v-row>
    <v-col v-for="file in filesPDF" :key="file.id" :cols="xs ? 12 : 'auto'">
      <AppPdfDialog v-if="isPdf(file) && file.url" :pdf-url="file.url">
        <template #activator="{ props: ActivatorProps }">
          <AppAttachmentCard
            v-bind="ActivatorProps"
            :attachment="file"
            :width="xs ? '100%' : 200"
          />
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
          <AppAttachmentCard
            v-bind="ActivatorProps"
            :attachment="image"
            :width="xs ? '100%' : 200"
          />
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
import { useDisplay } from 'vuetify';
import AppAttachmentCard from '@/components/app/AppAttachmentCard.vue';

const props = defineProps({
  files: {
    type: Array as PropType<EventFile[]>,
    default: () => [],
  },
});

const { xs } = useDisplay();

const filesFiltered = computed(() => props.files.filter((i) => i.visible));
const filesPDF = computed(() => filesFiltered.value.filter((i) => isPdf(i)));

const filesIMAGE = computed(() => filesFiltered.value.filter((i) => !isPdf(i)));

const filesImageUrls = computed(() => filesIMAGE.value.map((a) => a.url));
</script>
