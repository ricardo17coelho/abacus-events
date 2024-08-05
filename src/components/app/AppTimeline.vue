<template>
  <v-timeline align="start" side="end">
    <v-timeline-item
      v-for="item in items"
      :key="item.title"
      dot-color="primary"
      :icon="item.icon"
      :size="$vuetify.display.mdAndUp ? 'x-large' : undefined"
    >
      <div class="d-flex" :class="{ 'flex-column': $vuetify.display.xs }">
        <span class="me-4">{{ `${item.time_start}-${item.time_end}` }}</span>
        <div>
          <div>
            <strong>{{ item.title }}</strong>
          </div>
          <div v-if="item.note" class="text-caption text-primary text-break">
            <a
              v-if="isValidHttpUrl(item.note)"
              class="link-external"
              :href="item.note"
            >
              {{ item.note }}
            </a>
            <div v-else>
              <v-icon>mdi-information-variant</v-icon>
              {{ item.note }}
            </div>
          </div>
          <div>
            <v-chip
              v-for="location in item.locations"
              :key="`${item.title}-${location}`"
              size="small"
              class="mr-1"
              color="primary"
              variant="tonal"
              prepend-icon="mdi-home-map-marker"
            >
              {{ location }}
            </v-chip>
          </div>
        </div>
      </div>
      <slot name="actions" :item="item"></slot>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import type { ProgramTimeline } from '@/api/types/ProgramTimeline';
import { isValidHttpUrl } from '@/utils/isValidUrl';
import type { PropType } from 'vue';

defineProps({
  items: {
    type: Array as PropType<ProgramTimeline[]>,
    default: () => []
  },
  editable: {
    type: Boolean,
    default: false
  }
});
</script>
