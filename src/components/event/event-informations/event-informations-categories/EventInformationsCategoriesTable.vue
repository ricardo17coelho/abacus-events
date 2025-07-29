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
      <EventInformationsCategoriesDialog
        v-model="showDialog"
        :event-timeline-category-id="currentItemId"
        @success="onSaveSuccess"
      >
        <template #activator="{ props: ActivatorProps }">
          <VBtnPrimary color="primary" v-bind="ActivatorProps">
            {{ t('actions.add') }}
          </VBtnPrimary>
        </template>
      </EventInformationsCategoriesDialog>
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
import EventInformationsCategoriesDialog from './EventInformationsCategoriesDialog.vue';
// composables
import { toast } from 'vue-sonner';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { useI18n } from 'vue-i18n';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import useApiEventInformations from '@/api/event-informations.ts';
import type { EventInformationCategory } from '@/api/types/EventInformation.ts';

const { t } = useI18n();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const items = ref<EventInformationCategory[]>([]);

const showDialog = ref(false);

const { getEventInformationsCategories, removeEventInformationCategory } =
  useApiEventInformations();

const isLoading = ref(false);
async function fetchAll() {
  isLoading.value = true;
  const { data, error } = await getEventInformationsCategories(
    currentEvent.value!.id,
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
  const { error } = await removeEventInformationCategory(id);

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
    action: (item: EventInformationCategory) => {
      currentItemId.value = item.id;
      showDialog.value = true;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    show: () => true,
    action: (item: EventInformationCategory) => onRemove(item.id),
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

function onSaveSuccess(item: EventInformationCategory) {
  const ixd = items.value.findIndex((r) => r.id === item.id);
  if (ixd > -1) {
    Object.assign(items.value[ixd], item);
  } else {
    items.value.push(item);
  }
}
</script>
