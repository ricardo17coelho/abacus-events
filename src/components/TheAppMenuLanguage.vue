<template>
  <MenuLanguage
    v-model="locale"
    :available-locales="availableLocalesFiltered"
    hide-full-text
  />
</template>

<script setup lang="ts">
import MenuLanguage from '@/components/MenuLanguage.vue';
import { useI18n } from 'vue-i18n';

const { locale, availableLocales } = useI18n();

const lsLocale = useLocalStorage('locale', locale.value);

watch(
  () => lsLocale.value,
  (newValue) => {
    locale.value = newValue;
  },
  { immediate: true },
);

watch(
  () => locale.value,
  (newValue) => {
    lsLocale.value = newValue;
  },
);

const availableLocalesFiltered = computed(() =>
  availableLocales.filter(
    (availableLocale: string) => availableLocale !== locale.value,
  ),
);
</script>
