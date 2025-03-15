<template>
  <v-select
    :items="items"
    :label="t('event.layout')"
    name="field-event-layout"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { EVENT_LAYOUT } from '@/api/types/EventLayout.ts';

const { t } = useI18n();

const items = computed(() =>
  Object.values(EVENT_LAYOUT).map((i) => {
    return {
      value: i,
      title: i,
    };
  }),
);
</script>
