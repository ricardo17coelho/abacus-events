<template>
  <EventFilePicker v-model:selected="selected">
    <template #activator="{ props }">
      <v-row>
        <v-col cols="12">
          <AppGallery
            v-if="selected"
            :images="Array.isArray(selected) ? selected : [selected]"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-bind="props"
            clearable
            :label="label"
            :model-value="selected"
            readonly
          />
        </v-col>
      </v-row>
    </template>
  </EventFilePicker>
</template>

<script setup lang="ts">
import AppGallery from '@/components/app/AppGallery.vue';
import EventFilePicker from '@/components/event/EventFilePicker.vue';

defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: undefined,
  },
});

const selected = defineModel<string | string[]>('selected');
</script>
