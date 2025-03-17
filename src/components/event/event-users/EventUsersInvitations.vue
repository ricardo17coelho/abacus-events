<template>
  <UiTable
    :headers="headers"
    :items="invitations"
    subtitle="A list of all users invited to the company"
  >
    <template #toolbar-actions>
      <VBtnPrimary color="primary" @click="showDialog = true">
        Invite User
      </VBtnPrimary>
    </template>
    <template #[`item.expiry_date`]="{ item }">
      <v-chip>
        <span v-if="item.expiry_date">
          {{ formatDateTimeByFormat(item.expiry_date) }}
        </span>
        <span v-else>-</span>
      </v-chip>
    </template>
  </UiTable>

  <EventUsersInvitationsDialog v-model="showDialog" />
</template>

<script setup lang="ts">
// components
import { formatDateTimeByFormat, UiTable } from '@lib/ui';
import EventUsersInvitationsDialog from './EventUsersInvitationsDialog.vue';
// apis
import useApiEventInvitations from '@/api/event-invitations.ts';
// composables
import { toast } from 'vue-sonner';
import type { EventInvitation } from '@/api/types/EventInvitation.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const showDialog = ref(false);

const { getInvitationsByEventId } = useApiEventInvitations();

const invitations = ref<EventInvitation[]>([]);

const headers = ref([
  { title: 'E-Mail', key: 'email' },
  { title: 'Created at', key: 'created_at' },
  { title: 'Expires at', key: 'expiry_date' },
]);

async function fetchAll() {
  if (!currentEvent.value?.id) return;
  const { data, error } = await getInvitationsByEventId(currentEvent.value.id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
    return;
  }
  if (data) {
    invitations.value = data;
  }
}

onMounted(() => fetchAll());
</script>
