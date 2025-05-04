<template>
  <ManageEventContainer v-if="currentEvent">
    <UiTable
      :actions="actions"
      :headers="headers"
      :items="currentEvent.persons"
      :title="t('labels.persons')"
    >
      <template #toolbar-actions>
        <EventPersonDialog @success="onSave">
          <template #activator="{ props: activatorProps }">
            <VBtnPrimary v-bind="activatorProps">
              {{ t('actions.add') }}
            </VBtnPrimary>
          </template>
        </EventPersonDialog>
      </template>

      <template #[`item.avatar`]="{ item }">
        <UiAvatarUser
          border
          color="white"
          :logo="item.avatar_url"
          :name="getUserFullName(item)"
        />
      </template>

      <template #[`item.name`]="{ item }">
        <div v-if="item.first_name || item.last_name">
          {{ getUserFullName(item) }}
        </div>
        <div v-else>-</div>
      </template>

      <template #[`item.description`]="{ item }">
        <div v-if="item.description">
          {{ showDefaultTranslationOrEmpty(item.description) }}
        </div>
      </template>
    </UiTable>

    <EventPersonDialog
      :event-person-id="currentEventPersonId"
      :model-value="currentEventPersonId !== undefined"
      @success="onSave"
      @update:model-value="currentEventPersonId = undefined"
    />
  </ManageEventContainer>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { type MenuItem, UiAvatarUser, UiTable, useMenuActions } from '@lib/ui';
import { useI18n } from 'vue-i18n';
import EventPersonDialog from '@/components/event/event-persons/EventPersonDialog.vue';
import type { EventPerson } from '@/api/types/EventPerson.ts';
import { toast } from 'vue-sonner';
import useApiEventPerson from '@/api/event-person.ts';
import { showDefaultTranslationOrEmpty } from '../../../utils/showDefaultTranslationOrEmpty.ts';
import { getUserFullName } from '@/utils/profile.ts';
import ManageEventContainer from '@/components/manage/ManageEventContainer.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { t } = useI18n();

const headers = ref([
  { title: '', key: 'avatar', width: '50' },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
]);

function onSave(payload: EventPerson) {
  if (!currentEvent.value) return;

  const idx = currentEvent.value.persons.findIndex((i) => i.id === payload.id);

  if (idx > -1) {
    Object.assign(currentEvent.value?.persons[idx], payload);
  } else {
    currentEvent.value?.persons.push(payload);
  }
}

const { removeEventPerson } = useApiEventPerson();

async function onDelete(item: EventPerson) {
  if (!currentEvent.value) return;
  const { error } = await removeEventPerson(item.id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  // Find the index of the item to remove
  const idx = currentEvent.value.persons.findIndex((i) => i.id === item.id);
  if (idx > -1) {
    // Use splice to remove the item from the array
    currentEvent.value.persons.splice(idx, 1);
  }
}

const currentEventPersonId = ref();

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventPerson) => {
      currentEventPersonId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventPerson) => onDelete(item),
  },
]);
</script>
