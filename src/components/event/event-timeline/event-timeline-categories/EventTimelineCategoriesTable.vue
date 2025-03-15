<template>
  <UiTable
    :actions="actions"
    :headers="headers"
    :items="items"
    :loading="isLoading"
    subtitle="A list of all timeline categories."
    title="Timeline categories"
  >
    <template #toolbar-actions>
      <EventTimelineCategoriesDialog
        v-model="showDialog"
        :event-timeline-category-id="currentItemId"
        @success="onSaveSuccess"
      >
        <template #activator="{ props: ActivatorProps }">
          <VBtnPrimary color="primary" v-bind="ActivatorProps">
            {{ t('actions.add') }}
          </VBtnPrimary>
        </template>
      </EventTimelineCategoriesDialog>
    </template>
    <template #[`item.title`]="{ item }">
      {{ showDefaultTranslationOrEmpty(item.title) }}
    </template>
    <template #[`item.color`]="{ item }">
      <v-icon :color="item.color">mdi-circle</v-icon>
    </template>
    <template #[`item.icon`]="{ item }">
      <v-icon :color="item.color">{{ item.icon }}</v-icon>
    </template>
  </UiTable>
</template>
<script lang="ts" setup>
import { type MenuItem, UiTable, useMenuActions } from '@lib/ui';
// components
import EventTimelineCategoriesDialog from './EventTimelineCategoriesDialog.vue';
// composables
import { toast } from 'vue-sonner';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import type { Role } from '@/api/types/Role.ts';
import useApiEventTimeline from '@/api/event-timeline.ts';
import type { EventTimelineCategory } from '@/api/types/EventTimeline.ts';
import { useI18n } from 'vue-i18n';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const { t } = useI18n();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const items = ref<EventTimelineCategory[]>([]);

const showDialog = ref(false);

const { getEventTimelineCategories, removeEventTimelineCategory } =
  useApiEventTimeline();

const isLoading = ref(false);
async function fetchAll() {
  isLoading.value = true;
  const { data, error } = await getEventTimelineCategories(
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
  const { error } = await removeEventTimelineCategory(id);

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

const headers = ref([
  { title: 'Title', key: 'title' },
  { title: 'Color', key: 'color', sortable: false },
  { title: 'Icon', key: 'icon', sortable: false },
]);

const currentItemId = ref();

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    show: () => true,
    action: (item: EventTimelineCategory) => {
      currentItemId.value = item.id;
      showDialog.value = true;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    show: () => true,
    action: (item: EventTimelineCategory) => onRemove(item.id),
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

function onSaveSuccess(role: Role) {
  const roleIdx = items.value.findIndex((r) => r.id === role.id);
  if (roleIdx > -1) {
    Object.assign(items.value[roleIdx], role);
  } else {
    items.value.push(role);
  }
}
</script>
