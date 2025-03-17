<template>
  <v-container
    v-if="currentEvent"
    class="d-flex justify-center flex-column ga-10 ma-0"
    fluid
  >
    <v-row>
      <v-col>
        <VCardSettings>
          <v-tabs v-model="currentTab">
            <v-tab value="users">Users</v-tab>
            <v-tab value="users-invitations">Invitations</v-tab>
          </v-tabs>
          <v-card-text>
            <AppStateSoonAlert />
            <v-tabs-window v-model="currentTab">
              <v-tabs-window-item value="users">
                <EventUsers />
              </v-tabs-window-item>
              <v-tabs-window-item value="users-invitations">
                <EventUsersInvitations />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </VCardSettings>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
// components
import EventUsers from '@/components/event/event-users/EventUsers.vue';
import EventUsersInvitations from '@/components/event/event-users/EventUsersInvitations.vue';

import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import AppStateSoonAlert from '@/components/app/AppStateSoonAlert.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const currentTab = ref();
</script>
