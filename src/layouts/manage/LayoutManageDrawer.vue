<template>
  <v-navigation-drawer v-model="model" width="280">
    <div class="d-flex align-center justify-center pa-4">
      <TheAppBarLogo width="230" />
    </div>

    <div class="px-2">
      <v-list color="primary" density="comfortable" nav rounded="lg" slim>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          exact
          link
          :prepend-icon="item.icon"
          :subtitle="item.subtitle"
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
import TheAppBarLogo from '@/layouts/components/TheAppBarLogo.vue';

const model = defineModel({ type: Boolean, default: false });

const { logout, isUserAdmin, isUserAdminOrHelper } = useAuthUser();

const navItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    to: {
      name: 'manage',
    },
  },
  {
    title: 'Users',
    icon: 'mdi-account-multiple',
    show: () => isUserAdmin.value,
    to: {
      name: 'manage-users',
    },
  },
  {
    title: 'Events',
    icon: 'mdi-calendar',
    show: () => isUserAdmin.value,
    to: {
      name: 'manage-events',
    },
  },
  {
    title: 'Parking Lots',
    icon: 'mdi-car',
    show: () => isUserAdminOrHelper.value,
    to: {
      name: 'manage-parking-lots',
    },
  },
  {
    title: 'Roles',
    subtitle: 'WIP',
    icon: 'mdi-account-key-outline',
    show: () => isUserAdmin.value,
    to: {
      name: 'manage-roles',
    },
  },
].filter((i) => (i.show ? i.show() : true));
</script>
