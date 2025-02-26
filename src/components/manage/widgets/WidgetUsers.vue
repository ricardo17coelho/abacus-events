<template>
  <v-card class="mx-auto" max-width="650" title="Uses">
    <template #append>
      <v-btn icon="mdi-account-multiple" :to="{ name: 'manage-users' }"></v-btn>
    </template>
    <v-divider />

    <v-list lines="two">
      <template v-for="(user, i) in users" :key="user.id">
        <v-divider v-if="i !== 0" />

        <v-list-item link>
          <template #prepend>
            <v-avatar color="surface-light" size="64" tile>
              {{ getInitials(getUserFullName(user)) }}
            </v-avatar>
          </template>

          <v-list-item-title class="text-subtitle-2 font-weight-bold">
            {{ getUserFullName(user) }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import useApiProfiles from '@/api/profiles.ts';
import type { Profile } from '@/api/types/Profile.ts';
import { getUserFullName } from '@/utils/profile.ts';
import { getInitials } from '../../../utils/initials.ts';

const { t } = useI18n();

const users = ref<Profile[]>([]);

const { getProfiles } = useApiProfiles();

const fetchData = async () => {
  const { data, error } = await getProfiles();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    users.value = data;
  }
};
fetchData();
</script>
