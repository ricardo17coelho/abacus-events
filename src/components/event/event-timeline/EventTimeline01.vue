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
          <template v-if="isCurrentTimeValid(item)" #append>
            <AppLiveLabel />
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

function isDateValid(date: string) {
  const today = new Date();
  const d = new Date(date);

  return today.getDate() === d.getDate();
}

//TODO: also check is current date and event date matches
function isCurrentTime(time_start: string, time_end: string) {
  if (!time_start || !time_end) return;
  const dt = new Date();

  const s = time_start.split(':');
  const dt1 = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    parseInt(s[0]),
    parseInt(s[1]),
  );

  const e = time_end.split(':');
  const dt2 = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    parseInt(e[0]),
    parseInt(e[1]),
  );

  return dt >= dt1 && dt <= dt2;
}

function isCurrentTimeValid(item: EventTimeline) {
  return (
    (!props.date || (props.date && isDateValid(props.date))) &&
    item.time_start &&
    item.time_end &&
    isCurrentTime(item.time_start, item.time_end)
  );
}
</script>
