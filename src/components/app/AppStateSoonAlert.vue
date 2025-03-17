<template>
  <v-alert
    icon="mdi-timer-sand-complete"
    :text="t('text.soon.text')"
    :title="t('text.soon.title')"
    type="warning"
    variant="tonal"
  >
  </v-alert>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
