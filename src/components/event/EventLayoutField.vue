<template>
  <v-select
    :items="items"
    :label="t('labels.layout')"
    name="field-event-layout"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { EVENT_LAYOUT, type EventLayout } from '@/api/types/EventLayout.ts';

const { t } = useI18n();

function getLayoutTitle(layoutId: EventLayout) {
  switch (layoutId) {
    case 'EVENT_LAYOUT_01':
      return 'Layout 01';
    case 'EVENT_LAYOUT_02':
      return 'Layout 02';
    case 'EVENT_LAYOUT_03':
      return 'Layout 03';
    default:
      return layoutId;
  }
}

const items = computed(() =>
  Object.values(EVENT_LAYOUT).map((i) => {
    return {
      value: i,
      title: getLayoutTitle(i),
    };
  }),
);
</script>
