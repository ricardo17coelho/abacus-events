<template>
  <v-form ref="formRef">
    <UiHtmlEditor
      v-if="currentModelLang"
      :key="currentModelLang"
      v-model="model[currentModelLang]"
      v-model:locale="currentModelLang"
      :available-locales="availableLocales"
      show-locale-select
    >
    </UiHtmlEditor>
  </v-form>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue';
// components
import UiHtmlEditor from './UiHtmlEditor.vue';
// composables
import { useI18n } from 'vue-i18n';

defineProps({
  availableLocales: {
    type: Array as PropType<string[]>,
    default: undefined,
  },
});

const model = defineModel({
  type: Object,
  default: () => ({ title: {} }),
});

const { locale } = useI18n();
const currentModelLang = ref(locale.value);

const formRef = ref();

defineExpose({ formRef });
</script>
