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
        <AppColorPicker v-model="model" />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppColorPicker from '@/components/app/AppColorPicker.vue';

const model = defineModel({ type: String, default: undefined });

const menuModel = ref(false);

const { t } = useI18n();
</script>
