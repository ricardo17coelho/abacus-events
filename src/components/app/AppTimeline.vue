<template>
  <v-timeline align="start" side="end" truncate-line="both">
    <v-timeline-item
      v-for="(item, idx) in items"
      :key="`${idx}-title-${showDefaultTranslationOrEmpty(item.title)}`"
      dot-color="primary"
      :icon="item.icon"
      :size="mdAndUp ? 'x-large' : undefined"
    >
      <div class="d-flex" :class="{ 'flex-column': xs }">
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
            <template
              v-for="location in item.locations"
              :key="`${item.title}-${location.id}`"
            >
              <AppImagesView
                :images="location.img_url ? [location.img_url] : []"
              >
                <template #activator="activatorProps">
                  <v-chip
                    v-bind="activatorProps"
                    class="mr-1"
                    color="tertiary"
                    density="compact"
                    prepend-icon="mdi-home-map-marker"
                    size="small"
                    variant="tonal"
                  >
                    {{ showDefaultTranslationOrEmpty(location.title) }}
                  </v-chip>
                </template>
              </AppImagesView>
            </template>
          </div>
        </div>
      </div>
      <div class="d-flex ma-3">
        <UiAvatarUser
          v-for="person in item.persons"
          :key="person.id"
          v-tooltip="getUserFullName(person)"
          border
          class="ml-n3"
          color="white"
          :logo="person.avatar_url"
          :name="getUserFullName(person)"
        />
      </div>
      <slot :item="item" name="actions" />
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import type { EventTimeline } from '@/api/types/EventTimeline.ts';
import { isValidHttpUrl } from '@/utils/isValidUrl';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';
import type { PropType } from 'vue';
import { useDisplay } from 'vuetify';
import { UiAvatarUser } from '@lib/ui';
import { getUserFullName } from '@/utils/profile.ts';
import AppImagesView from '@/components/app/AppImagesView.vue';

defineProps({
  items: {
    type: Array as PropType<EventTimeline[]>,
    default: () => [],
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const { xs, mdAndUp } = useDisplay();
</script>
