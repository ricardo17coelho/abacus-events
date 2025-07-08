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

    <template #append>
      <UiDialog v-model="dialog" max-width="600">
        <template #activator="{ props: ActivatorProps }">
          <v-btn v-bind="ActivatorProps" icon="mdi-plus"> </v-btn>
        </template>
        <template #content>
          <EventTimelineLocationsTable />
        </template>
      </UiDialog>
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
import type { EventTimelineLocation } from '@/api/types/EventTimeline.ts';
import { UiDialog } from '@lib/ui';
import EventTimelineLocationsTable from './EventTimelineLocationsTable.vue';
import { watch } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'field-event-timeline-locations',
  },
  eventId: {
    type: String,
    required: true,
  },
});

const model = defineModel({ type: [String, Array], default: undefined });

interface EventTimelineLocationItem {
  title: string;
  value: string;
  item: EventTimelineLocation;
}

const items = ref<EventTimelineLocationItem[]>([]);

const { getEventTimelineLocations } = useApiEventTimeline();

async function initialFetch() {
  const { data, error } = await getEventTimelineLocations(props.eventId);

  if (error) return;
  if (data) {
    items.value = data.map((location) => {
      return {
        title: showDefaultTranslationOrEmpty(location.title) || '',
        value: location.id,
        item: location,
      };
    });
  }

  return [];
}

initialFetch();

const dialog = ref(false);

watch(
  () => dialog.value,
  (newValue) => {
    if (!newValue) {
      initialFetch();
    }
  },
);
</script>
