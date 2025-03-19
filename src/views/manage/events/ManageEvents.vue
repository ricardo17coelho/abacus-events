<template>
  <Page>
    <PageHeading title="Events" />
    <PageContent>
      <UiTable
        :actions="actions"
        :headers="headers"
        :items="events"
        subtitle="A list of all events."
        title="Events"
        @click:row="onRowClick"
      >
        <template #toolbar-actions>
          <EventDialog v-if="isUserAdmin" @success="onSave">
            <template #activator="{ props: activatorProps }">
              <VBtnPrimary v-bind="activatorProps" prepend-icon="mdi-plus">
                {{ t('actions.add') }}
              </VBtnPrimary>
            </template>
          </EventDialog>
        </template>

        <template #[`item.title`]="{ item }">
          {{ showDefaultTranslationOrEmpty(item.title) }}
        </template>
        <template #[`item.date`]="{ item }">
          {{ formatDateByFormat(item.date) }}
        </template>
      </UiTable>

      <EventDialog
        :event-id="currentEventId"
        :model-value="currentEventId !== undefined"
        @success="onSave"
        @update:model-value="currentEventId = undefined"
      />
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page';
import EventDialog from '@/components/event/event/EventDialog.vue';
import useAuthUser from '@/composables/auth-user.ts';
import { useI18n } from 'vue-i18n';
import {
  formatDateByFormat,
  type MenuItem,
  UiTable,
  useMenuActions,
} from '@lib/ui';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import type { Event } from '@/api/types/Event.ts';
import useApiEvents from '@/api/events.ts';
import { toast } from 'vue-sonner';

const { isUserAdmin } = useAuthUser();
const { t } = useI18n();
const router = useRouter();

const headers = ref([
  { title: 'Title', key: 'title' },
  { title: 'Date', key: 'date' },
]);

const events = ref<Event[]>([]);

const { getEvents } = useApiEvents();

const fetchData = async () => {
  const { data, error } = await getEvents();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    events.value = data;
  }
};
fetchData();

function onSave(payload: Event) {
  const idx = events.value.findIndex((i) => i.id === payload.id);

  if (idx > -1) {
    Object.assign(events.value[idx], payload);
  } else {
    events.value.push(payload);
  }
}

function onRowClick({ params }: { params: { item: Event } }) {
  onGoToEvent(params.item);
}

function onGoToEvent(item: Event) {
  router.push({ name: 'manage-events-id', params: { eventId: item.id } });
}

const currentEventId = ref();

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.view,
    action: onGoToEvent,
  },
  {
    ...menuGlobalActions.value.edit,
    action: (item: Event) => {
      currentEventId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: Event) => {
      console.warn('#TODO: delete', item);
    },
  },
]);
</script>
