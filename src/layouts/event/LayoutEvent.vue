<template>
  <component :is="currentEventLayout" />
</template>

<script lang="ts" setup>
import LayoutEvent01 from '@/layouts/event/LayoutEvent01/LayoutEvent01.vue';
import LayoutEvent02 from '@/layouts/event/LayoutEvent02/LayoutEvent02.vue';
import LayoutEvent03 from '@/layouts/event/LayoutEvent03/LayoutEvent03.vue';
import LayoutEvent04 from '@/layouts/event/LayoutEvent04/LayoutEvent04.vue';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const currentEventLayout = computed(() => {
  switch (currentEvent.value?.brand?.layout) {
    case 'EVENT_LAYOUT_01':
      return LayoutEvent01;
    case 'EVENT_LAYOUT_02':
      return LayoutEvent02;
    case 'EVENT_LAYOUT_03':
      return LayoutEvent03;
    case 'EVENT_LAYOUT_04':
      return LayoutEvent04;
    default:
      return LayoutEvent01;
  }
});
</script>
