<template>
  <v-card class="mx-auto" elevation="0" width="100%">
    <v-list lines="two">
      <template v-for="(item, i) in items" :key="i">
        <v-divider v-if="i !== 0" />
        <v-list-item
          class="my-1"
          :variant="isCurrentTimeValid(item) ? 'outlined' : undefined"
        >
          <template #prepend>
            <v-avatar color="surface-light" size="64" tile>
              <div>
                <div class="font-weight-black">
                  {{ item.time_start }}
                </div>
                -
                <div class="font-weight-black">{{ item.time_end }}</div>
              </div>
            </v-avatar>
          </template>

          <v-list-item-subtitle v-if="item.note" class="text-caption mb-2">
            {{ showDefaultTranslationOrEmpty(item.note) }}
          </v-list-item-subtitle>

          <v-list-item-title class="text-subtitle-2 font-weight-bold text-wrap">
            {{ showDefaultTranslationOrEmpty(item.title) }}
          </v-list-item-title>

          <div v-if="item.locations?.length">
            <v-chip
              v-for="location in item.locations"
              :key="`${item.title}-${location}`"
              class="mr-1"
              color="primary"
              density="compact"
              prepend-icon="mdi-home-map-marker"
              size="small"
              variant="tonal"
            >
              {{ location }}
            </v-chip>
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
              size="small"
            />
          </div>

          <slot></slot>

          <template #append>
            <AppLiveLabel v-if="isCurrentTimeValid(item)" />
            <slot v-if="$slots.actions" :item="item" name="actions" />
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
import type { EventTimeline } from '@/api/types/EventTimeline.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import AppLiveLabel from '@/components/app/AppLiveLabel.vue';
import { isDateToday } from '@/utils/date.ts';
import { isStartEndCurrentTime } from '@/utils/time.ts';
import { getUserFullName } from '@/utils/profile.ts';
import { UiAvatarUser } from '@lib/ui';

const props = defineProps({
  items: {
    type: Array as PropType<EventTimeline[]>,
    default: () => [],
  },
  date: {
    type: String,
    default: undefined,
  },
});

function isCurrentTimeValid(item: EventTimeline) {
  if (!props.date || (props.date && !isDateToday(props.date))) return false;
  return (
    item.time_start &&
    item.time_end &&
    isStartEndCurrentTime(item.time_start, item.time_end)
  );
}
</script>
