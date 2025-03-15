<template>
  <v-text-field
    v-model="model"
    clearable
    :label="t('fields.color.label')"
    readonly
  >
    <template #prepend-inner>
      <v-icon class="cursor-pointer" :color="model">mdi-palette</v-icon>
    </template>
  </v-text-field>
  <v-menu
    v-model="menuModel"
    activator="parent"
    :close-on-content-click="false"
  >
    <v-card>
      <v-card-text>
        <v-color-picker
          v-model="model"
          mode="hex"
          :modes="['hex']"
          show-swatches
          :swatches="swatches"
        />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: String, default: undefined });

const menuModel = ref(false);

const { t } = useI18n();

const swatches = [
  // Abacus
  ['#de323c', '#ffffff', '#282828'],
  // AbaNinja, AbaCloud, AbaMobile
  ['#128ef2', '#1677cb', '#ffa539'],
  // DeepCloud
  ['#ff2800', '#212529', '#f8f9fa'],
];
</script>
