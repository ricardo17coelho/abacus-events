<template>
  <v-app full-height>
    <v-container class="fill-height grid-list-md py-0">
      <v-layout full-height max-width="1200">
        <v-app-bar flat>
          <v-img src="/logos/abacus.svg" max-width="200" width="150"> </v-img>
          <v-spacer></v-spacer>
          <template #append>
            <div class="d-flex ga-5">
              {{ currentUser }}
              <VBtnPrimary
                v-if="!currentUser"
                href="https://summer-party.events.abacus.ch/"
                :icon="$vuetify.display.xs ? 'mdi-clipboard-text' : undefined"
                :size="$vuetify.display.xs ? 'small' : undefined"
                :text="$vuetify.display.smAndUp ? 'Programm' : undefined"
              >
              </VBtnPrimary>
              <VBtnPrimary
                v-if="currentUser"
                :icon="$vuetify.display.xs ? 'mdi-logout' : undefined"
                :size="$vuetify.display.xs ? 'small' : undefined"
                :text="$vuetify.display.smAndUp ? 'Logout' : undefined"
                @click="logout"
              >
              </VBtnPrimary>
              <VBtnPrimary
                v-else
                :icon="$vuetify.display.xs ? 'mdi-login' : undefined"
                :to="{ name: 'auth-sign-in' }"
                :size="$vuetify.display.xs ? 'small' : undefined"
                :text="$vuetify.display.smAndUp ? 'Login' : undefined"
              >
              </VBtnPrimary>
            </div>
          </template>
        </v-app-bar>
        <v-main class="text-slate-700 dark:text-slate-300">
          <v-container fluid class="overflow-auto bg-container">
            <RouterView />
          </v-container>
        </v-main>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import useAuthUser from '@/composables/auth-user';
import { useAuthStore } from '@/stores/auth';

const { currentUser } = useAuthStore();
const { logout } = useAuthUser();
</script>
<style scoped>
.bg-container {
  height: calc(100svh - 64px);
}
</style>
