<template>
  <v-app-bar class="px-1" flat>
    <v-container class="d-flex align-center py-0 app-container">
      <router-link to="/">
        <v-img max-width="200" src="/logos/abacus.svg" width="150" />
      </router-link>

      <v-btn
        v-if="isUserAdminOrHelper"
        class="ml-2"
        icon="mdi-view-dashboard"
        :to="{ name: 'manage' }"
      />
      <v-spacer />
      <div
        class="d-flex"
        :class="{
          'ga-1': xs,
          'ga-5': smAndUp,
        }"
      >
        <TheAppMenuLanguage />
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/auth-user.ts';
import { useDisplay } from 'vuetify';
import TheAppMenuLanguage from '@/components/TheAppMenuLanguage.vue';

const { isUserAdminOrHelper } = useAuthUser();

const { xs, smAndUp } = useDisplay();
</script>
