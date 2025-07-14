<template>
  <v-btn
    v-if="isUserAdminOrHelper"
    class="ml-2"
    icon="mdi-view-dashboard"
    :to="{ name: 'manage' }"
  />
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/auth-user.ts';

const { isUserAdminOrHelper } = useAuthUser();
</script>
