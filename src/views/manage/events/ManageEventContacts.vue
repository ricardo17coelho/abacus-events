<template>
  <v-container
    v-if="currentEvent"
    class="d-flex justify-center flex-column ga-10 ma-0"
    fluid
  >
    <UiTable
      :actions="actions"
      :headers="headers"
      :items="currentEvent.contacts"
      :title="t('labels.features.CONTACTS')"
    >
      <template #toolbar-actions>
        <EventContactDialog @success="onSave">
          <template #activator="{ props: activatorProps }">
            <VBtnPrimary v-bind="activatorProps">
              {{ t('actions.add') }}
            </VBtnPrimary>
          </template>
        </EventContactDialog>
      </template>
      <template #[`item.type`]="{ item }">
        <v-icon v-if="item.type">
          {{ getEventContactIcon(item.type) }}
        </v-icon>
      </template>
    </UiTable>

    <EventContactDialog
      :event-contact-id="currentEventContactId"
      :model-value="currentEventContactId !== undefined"
      @success="onSave"
      @update:model-value="currentEventContactId = undefined"
    />
  </v-container>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { type MenuItem, UiTable, useMenuActions } from '@lib/ui';
import { useI18n } from 'vue-i18n';
import EventContactDialog from '@/components/event/event-contacts/EventContactDialog.vue';
import type { EventContact } from '@/api/types/EventContact.ts';
import { toast } from 'vue-sonner';
import useApiEventContact from '@/api/event-contact.ts';
import { getEventContactIcon } from '@/components/event/event-contacts/event-contacts.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { t } = useI18n();

const headers = ref([
  { title: '', key: 'type', width: '50' },
  { title: 'Description', key: 'description' },
  { title: 'Value', key: 'value' },
]);

function onSave(payload: EventContact) {
  if (!currentEvent.value) return;

  const idx = currentEvent.value.contacts.findIndex((i) => i.id === payload.id);

  if (idx > -1) {
    Object.assign(currentEvent.value?.contacts[idx], payload);
  } else {
    currentEvent.value?.contacts.push(payload);
  }
}

const { removeEventContact } = useApiEventContact();

async function onDelete(item: EventContact) {
  if (!currentEvent.value) return;
  const { error } = await removeEventContact(item.id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  // Find the index of the item to remove
  const idx = currentEvent.value.contacts.findIndex((i) => i.id === item.id);
  if (idx > -1) {
    // Use splice to remove the item from the array
    currentEvent.value.contacts.splice(idx, 1);
  }
}

const currentEventContactId = ref();

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventContact) => {
      currentEventContactId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventContact) => onDelete(item),
  },
]);
</script>
