<template>
  <v-text-field
    v-model="model"
    hint="An icon from MDI ex: mdi-balloon"
    :label="t('labels.icon')"
  >
    <template #append-inner>
      <v-icon v-if="model" color="primary" start>{{ model }}</v-icon>
      <v-btn
        density="compact"
        href="https://pictogrammers.com/library/mdi/"
        icon="mdi-open-in-new"
        size="small"
        target="_blank"
        tile
        variant="text"
      >
      </v-btn>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const model = defineModel({
  type: String,
  default: undefined,
});

const { t } = useI18n();
</script>
