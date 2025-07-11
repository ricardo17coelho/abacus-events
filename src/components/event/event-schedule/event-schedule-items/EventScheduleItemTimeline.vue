<template>
  <v-timeline
    align="start"
    class="timeline"
    density="compact"
    dot-color="primary"
    side="end"
    size="x-small"
    truncate-line="both"
  >
    <v-timeline-item
      v-for="(item, idx) in items"
      :key="`${idx}-return`"
      class="timeline-item"
      icon="mdi-arrow-down"
    >
      <v-list-item class="px-0" slim width="100%">
        <template v-if="$slots.prepend" #prepend>
          <slot :item="item" name="prepend"> </slot>
        </template>
        <template v-if="$slots.title || item.text" #title>
          <slot :item="item" name="title">
            <a
              class="link-external text-wrap"
              :href="item.text_link"
              target="_blank"
            >
              {{ item.text }}
            </a>
          </slot>
        </template>
        <template v-if="$slots.append" #append>
          <slot :item="item" name="append"> </slot>
        </template>
      </v-list-item>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import type { EventScheduleItem } from '@/api/types/EventSchedule.ts';

defineProps({
  items: {
    type: Array as PropType<EventScheduleItem[]>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.timeline-item {
  :deep(.v-timeline-item__body) {
    width: 100%;
  }
  :deep(.v-timeline-divider) {
    justify-content: center;
  }
}
</style>
