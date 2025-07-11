<template>
  <DialogTitleI18n
    v-model="showDialogModelI18n"
    :i18n="model"
    @save="onSaveModelI18n"
  >
    <template #activator="{ props: activatorProps }">
      <v-text-field
        :model-value="modelValue"
        readonly
        v-bind="mergeProps(activatorProps, $attrs)"
      >
      </v-text-field>
    </template>
  </DialogTitleI18n>
</template>

<script lang="ts" setup>
// components
import DialogTitleI18n from '@/components/dialogs/DialogTitleI18n.vue';
// utils
import type { TitleI18n } from '@/types/TitleI18n.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { mergeProps } from 'vue';

const model = defineModel({ type: Object, default: undefined });

const showDialogModelI18n = ref(false);
function onSaveModelI18n(i18n: TitleI18n) {
  model.value = i18n;
  showDialogModelI18n.value = false;
}

const modelValue = computed(() => showDefaultTranslationOrEmpty(model.value));
</script>
