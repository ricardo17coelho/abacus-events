<template>
  <v-app-bar class="px-1" flat>
    <TheLayoutContainer>
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
      <TheUserMenu />
    </TheLayoutContainer>
  </v-app-bar>
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/auth-user.ts';
import { useDisplay } from 'vuetify';
import TheLayoutContainer from '@/layouts/components/TheLayoutContainer.vue';
import TheAppMenuLanguage from '@/components/TheAppMenuLanguage.vue';
import TheUserMenu from '@/layouts/components/TheUserMenu.vue';

const { isUserAdminOrHelper } = useAuthUser();

const { xs, smAndUp } = useDisplay();
</script>
