<template>
  <v-app-bar flat class="px-1">
    <v-container class="d-flex align-center py-0 app-container">
      <router-link to="/">
        <v-img src="/logos/abacus.svg" max-width="200" width="150"> </v-img>
      </router-link>
      <v-spacer></v-spacer>
      <div
        class="d-flex"
        :class="{
          'ga-1': $vuetify.display.xs,
          'ga-5': $vuetify.display.smAndUp
        }"
      >
        <MenuLanguage
          v-model="locale"
          :available-locales="availableLocalesFiltered"
          hide-full-text
        />

        <VBtnPrimary
          v-if="currentUser"
          :icon="$vuetify.display.xs ? 'mdi-logout' : undefined"
          :size="$vuetify.display.xs ? 'small' : undefined"
          :text="$vuetify.display.smAndUp ? $t('labels.logout') : undefined"
          @click="logout"
        >
        </VBtnPrimary>
        <VBtnPrimary
          v-else
          :icon="$vuetify.display.xs ? 'mdi-login' : undefined"
          :to="{ name: 'auth-sign-in' }"
          :size="$vuetify.display.xs ? 'small' : undefined"
          :text="$vuetify.display.smAndUp ? $t('labels.login') : undefined"
        >
        </VBtnPrimary>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/auth-user';
import { useAuthStore } from '@/stores/auth';
import MenuLanguage from './MenuLanguage.vue';
import { useI18n } from 'vue-i18n';

const { currentUser } = useAuthStore();
const { logout } = useAuthUser();

const { locale, availableLocales } = useI18n();

const availableLocalesFiltered = computed(() =>
  availableLocales.filter(
    (availableLocale: string) => availableLocale !== locale.value
  )
);
</script>
