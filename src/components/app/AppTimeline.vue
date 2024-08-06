<template>
  <v-timeline align="start" side="end">
    <v-timeline-item
      v-for="(item, idx) in items"
      :key="`${idx}-title-${showDefaultTranslationOrEmpty(item.title)}`"
      dot-color="primary"
      :icon="item.icon"
      :size="$vuetify.display.mdAndUp ? 'x-large' : undefined"
    >
      <div class="d-flex" :class="{ 'flex-column': $vuetify.display.xs }">
        <span class="me-4">{{ `${item.time_start}-${item.time_end}` }}</span>
        <div>
          <div>
            <strong>{{ showDefaultTranslationOrEmpty(item.title) }}</strong>
          </div>
          <div
            v-if="showDefaultTranslationOrEmpty(item.note)"
            class="text-caption text-primary text-break"
          >
            <a
              v-if="isValidHttpUrl(showDefaultTranslationOrEmpty(item.note))"
              class="link-external"
              :href="showDefaultTranslationOrEmpty(item.note)"
            >
              {{ showDefaultTranslationOrEmpty(item.note) }}
            </a>
            <div v-else>
              <v-icon>mdi-information-variant</v-icon>
              {{ showDefaultTranslationOrEmpty(item.note) }}
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
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';
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
