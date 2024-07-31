<template>
  <AppDialog max-width="1000" fullscreen>
    <template #activator="{ props: activatorProps }">
      <v-fab
        v-bind="activatorProps"
        class="me-4"
        location="bottom end"
        app
        icon
        color="primary"
      >
        Plan
      </v-fab>
    </template>

    <template #content>
      <AppLoadingIcon v-show="!pdfLoaded" />
      <VuePDF
        v-show="pdfLoaded"
        :pdf="pdf"
        :scale="scale"
        @loaded="pdfLoaded = true"
      />
    </template>
    <template #actions>
      <v-spacer />
      <div class="d-flex justify-space-between align-center ga-3">
        <v-btn
          variant="flat"
          color="primary"
          @click="scale = scale > 0.25 ? scale - 0.25 : scale"
        >
          -
        </v-btn>
        <span>{{ scale * 100 }}%</span>
        <v-btn
          variant="flat"
          color="primary"
          @click="scale = scale < 2 ? scale + 0.25 : scale"
        >
          +
        </v-btn>
      </div>

      <v-spacer />
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf';
import AppDialog from '@/components/app/AppDialog.vue';
import AppLoadingIcon from '@/components/app/AppLoadingIcon.vue';

const props = defineProps({
  pdfUrl: {
    type: String,
    default: undefined
  }
});

const scale = ref(0.25);
const { pdf, info } = usePDF(props.pdfUrl);
console.log(`Document info: ${info}`);

const pdfLoaded = ref(false);
</script>
