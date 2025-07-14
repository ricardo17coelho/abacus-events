<template>
  <v-btn v-if="isLoggedIn" class="me-2" height="48" icon>
    <v-avatar
      color="surface-light"
      :icon="userInitials ? undefined : 'mdi-account'"
      size="32"
      :text="userInitials"
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

const { isLoggedIn, userInitials, logout } = useAuthUser();

const { isUserAdminOrHelper } = useAuthUser();
</script>
