<template>
  <UiTable
    :actions="actions"
    :headers="headers"
    :items="items"
    :loading="isLoading"
    subtitle="A list of all timeline locations."
    title="Timeline locations"
  >
    <template #toolbar-actions>
      <EventTimelineLocationDialog
        v-model="showDialog"
        :event-timeline-location-id="currentItemId"
        @success="onSaveSuccess"
      >
        <template #activator="{ props: ActivatorProps }">
          <VBtnPrimary color="primary" v-bind="ActivatorProps">
            {{ t('actions.add') }}
          </VBtnPrimary>
        </template>
      </EventTimelineLocationDialog>
    </template>
    <template #[`item.title`]="{ item }">
      {{ showDefaultTranslationOrEmpty(item.title) }}
    </template>
  </UiTable>
</template>
<script lang="ts" setup>
import { type MenuItem, UiTable, useMenuActions } from '@lib/ui';
// components
import EventTimelineLocationDialog from './EventTimelineLocationDialog.vue';
// composables
import { toast } from 'vue-sonner';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import useApiEventTimeline from '@/api/event-timeline.ts';
import type { EventTimelineLocation } from '@/api/types/EventTimeline.ts';
import { useI18n } from 'vue-i18n';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const { t } = useI18n();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const items = ref<EventTimelineLocation[]>([]);

const showDialog = ref(false);

const { getEventTimelineLocations, removeEventTimelineLocation } =
  useApiEventTimeline();

const isLoading = ref(false);
async function fetchAll() {
  isLoading.value = true;
  const { data, error } = await getEventTimelineLocations(
    currentEvent.value?.id,
  );

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      items.value = data;
    }
  }

  isLoading.value = false;
}

fetchAll();

async function onRemove(id: string) {
  const { error } = await removeEventTimelineLocation(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    const idx = items.value.findIndex((r) => r.id === id);
    if (idx > -1) {
      items.value.splice(idx, 1);
    }
  }
}

const headers = ref([{ title: 'Title', key: 'title' }]);

const currentItemId = ref();

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    show: () => true,
    action: (item: EventTimelineLocation) => {
      currentItemId.value = item.id;
      showDialog.value = true;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    show: () => true,
    action: (item: EventTimelineLocation) => onRemove(item.id),
  },
]);

watch(
  () => showDialog.value,
  (newValue) => {
    if (!newValue) {
      currentItemId.value = undefined;
    }
  },
);

function onSaveSuccess(item: EventTimelineLocation) {
  const idx = items.value.findIndex((r) => r.id === item.id);
  if (idx > -1) {
    Object.assign(items.value[idx], item);
  } else {
    items.value.push(item);
  }
}
</script>
