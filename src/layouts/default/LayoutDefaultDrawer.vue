<template>
  <v-navigation-drawer v-model="model" width="280">
    <div class="d-flex align-center pa-4">
      <router-link to="/">
        <v-img src="/logos/abacus.svg" width="230" />
      </router-link>
    </div>

    <div class="px-2">
      <v-list color="primary" density="comfortable" nav rounded="lg" slim>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          exact
          link
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
        >
        </v-list-item>
      </v-list>
    </div>

    <template #append>
      <v-divider />

      <v-list color="primary" density="comfortable" nav rounded="lg" slim>
        <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout" />
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/auth-user.ts';

const model = defineModel({ type: Boolean, default: false });

const { logout } = useAuthUser();

const navItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    to: {
      name: 'dashboard',
    },
  },
  {
    title: 'Users',
    icon: 'mdi-account-multiple',
    to: {
      name: 'manage-users',
    },
  },
  {
    title: 'Events',
    icon: 'mdi-calendar',
    to: {
      name: 'manage-events',
    },
  },
  {
    title: 'Parking Lots',
    icon: 'mdi-car',
    to: {
      name: 'manage-parking-lots',
    },
  },
  {
    title: 'Roles',
    icon: 'mdi-account-key-outline',
    to: {
      name: 'manage-roles',
    },
  },
];
</script>
