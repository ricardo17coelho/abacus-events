<template>
  <v-select
    :items="items"
    :label="t('event.feature')"
    name="field-event-feature-type"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { EVENT_FEATURE_TYPE } from '@/api/types/EventFeature.ts';

const { t } = useI18n();

const items = computed(() =>
  Object.values(EVENT_FEATURE_TYPE).map((i) => {
    return {
      value: i,
      title: i,
    };
  }),
);
</script>
