<template>
  <v-autocomplete
    v-model="model"
    auto-select-first
    autocomplete="off"
    :disabled="loading"
    :items="items"
    :loading="loading"
    :name="name"
    @update:menu="initialFetch"
  >
    <template #item="{ props: ItemProps, item }">
      <v-list-item v-bind="ItemProps" slim :title="item.title">
        <template v-if="item.raw.item" #prepend>
          <v-avatar>
            <v-icon :color="item.raw.item?.color">
              {{ item.raw.item.icon }}
            </v-icon>
          </v-avatar>
        </template>
      </v-list-item>
    </template>
    <template #append-inner>
      <slot name="append-inner" />
      <v-progress-circular
        v-if="loading"
        color="primary"
        indeterminate
        size="small"
        width="1"
      />
    </template>

    <template #chip="{ props, item }">
      <v-chip
        v-if="item.raw.item"
        v-bind="props"
        :prepend-icon="item.raw.item.icon"
        :text="item.title"
      />
    </template>

    <!--
      Dynamically inherit slots from parent
      & make all slots from component reusable from parent
    -->
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData" />
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import useApiEventTimeline from '@/api/event-timeline.ts';
import type { EventTimelineCategory } from '@/api/types/EventTimeline.ts';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'field-event-timeline-categories',
  },
  eventId: {
    type: String,
    required: true,
  },
});

const model = defineModel({ type: [String, Array], default: undefined });

interface EventTimelineCategoryItem {
  title: string;
  value: string;
  item: EventTimelineCategory;
}

const items = ref<EventTimelineCategoryItem[]>([]);

const { getEventTimelineCategories } = useApiEventTimeline();

async function initialFetch() {
  const { data, error } = await getEventTimelineCategories(props.eventId);

  if (error) return;
  if (data) {
    items.value = data.map((category) => {
      return {
        title: showDefaultTranslationOrEmpty(category.title) || '',
        value: category.id,
        item: category,
      };
    });
  }

  return [];
}

initialFetch();
</script>
