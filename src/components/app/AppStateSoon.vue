<template>
  <v-empty-state
    icon="mdi-timer-sand-complete"
    :text="t('text.soon.text')"
    :title="t('text.soon.title')"
  >
    <template #media>
      <v-icon color="surface-light" size="128" />
    </template>
  </v-empty-state>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
