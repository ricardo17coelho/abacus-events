<template>
  <v-chip color="primary">
    {{
      new Date(date).toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }}
  </v-chip>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps({
  date: {
    type: String,
    default: undefined,
  },
});

const { locale } = useI18n();
</script>
