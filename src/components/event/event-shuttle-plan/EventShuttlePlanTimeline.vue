<template>
  <v-timeline
    align="start"
    density="compact"
    dot-color="primary"
    side="end"
    size="x-small"
    truncate-line="both"
  >
    <v-timeline-item
      v-for="(item, idx) in items"
      :key="`${idx}-return`"
      icon="mdi-arrow-down"
    >
      <div class="d-inline-flex">
        <slot :item="item" name="prepend"> </slot>
        <div class="flex-grow-1">
          <a class="link-external" :href="item.location_link" target="_blank">
            {{ item.location }}
          </a>
        </div>
        <slot :item="item" name="append"></slot>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import type { EventShuttlePlan } from '@/api/types/EventShuttlePlan.ts';

defineProps({
  items: {
    type: Array as PropType<EventShuttlePlan[]>,
    default: () => [],
  },
});
</script>

<style scoped></style>
