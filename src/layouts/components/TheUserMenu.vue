<template>
  <v-btn v-if="isLoggedIn" class="me-2" height="48" icon>
    <UiAvatarUser
      class="border-solid"
      color="surface-light"
      :logo="userProfile?.avatar_url"
      :logo-alt="`logo-url-${getUserFullName(user.user_metadata)}`"
      :name="getUserFullName(user.user_metadata)"
    />

    <v-menu activator="parent">
      <v-list density="compact" nav slim>
        <v-list-item
          prepend-icon="mdi-account"
          title="Profile"
          :to="{ name: 'profile-account' }"
        />
        <v-list-item
          v-if="isUserAdminOrHelper"
          prepend-icon="mdi-view-dashboard"
          title="Manage"
          :to="{ name: 'manage' }"
        />
        <v-list-item
          link
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logout"
        />
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/auth-user.ts';
import { getUserFullName } from '@/utils/profile.ts';
import { UiAvatarUser } from '@lib/ui';

const { isLoggedIn, logout, user, userProfile } = useAuthUser();

const { isUserAdminOrHelper } = useAuthUser();
</script>
