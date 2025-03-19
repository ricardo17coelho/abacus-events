<template>
  <UiTable
    :actions="actions"
    :headers="headers"
    :items="users"
    subtitle="A list of all users of the event."
    title="Users"
  >
    <template #toolbar-actions>
      <VBtnPrimary color="primary" @click="showDialog = true">
        Invite User
      </VBtnPrimary>
    </template>
    <template #[`item.name`]="{ item }">
      <div v-if="item.data">
        <div v-if="item.data?.firstname || item.data?.lastname">
          {{ `${item.data?.firstname} ${item.data?.lastname}` }}
        </div>
        <div v-else>-</div>
      </div>
    </template>
    <template #[`item.role`]="{ item }">
      <v-chip v-if="item.role && item.role.title">
        {{ item.role.title[locale] }}
      </v-chip>
    </template>
  </UiTable>

  <EventUsersInvitationsDialog v-model="showDialog" />
</template>

<script setup lang="ts">
// components
import EventUsersInvitationsDialog from './EventUsersInvitationsDialog.vue';
// apis
import useApiEventUsers from '@/api/event-users.ts';
// composables
import { toast } from 'vue-sonner';
// types & constants
import { useI18n } from 'vue-i18n';
import type { EventUser } from '@/api/types/EventUser.ts';
import { type MenuItem, UiTable, useMenuActions } from '@lib/ui';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { locale } = useI18n();

const showDialog = ref(false);

const { getAll, removeById } = useApiEventUsers();

const users = ref<EventUser[]>([]);

const headers = ref([
  { title: 'Name', key: 'name' },
  { title: 'Role', key: 'role' },
]);

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventUser) => onRemoveUser(item.user_id),
  },
]);

async function onGetUsers() {
  if (!currentEvent.value?.id) return;
  const { data, error } = await getAll(currentEvent.value.id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  }
  if (data) {
    users.value = data;
  }
}

onMounted(() => onGetUsers());

async function onRemoveUser(id: string) {
  const { error } = await removeById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    const idx = users.value.findIndex((u) => u.user_id === id);
    if (idx > -1) {
      users.value.splice(idx, 1);
    }
  }
}
</script>
