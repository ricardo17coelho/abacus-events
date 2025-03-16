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
        <MenuLanguage
          v-model="locale"
          :available-locales="availableLocalesFiltered"
          hide-full-text
        />
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/auth-user.ts';
import MenuLanguage from '../../components/MenuLanguage.vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

const { isUserAdminOrHelper } = useAuthUser();

const { locale, availableLocales } = useI18n();
const { xs, smAndUp } = useDisplay();

const lsLocale = useLocalStorage('locale', locale.value);

watch(
  () => lsLocale.value,
  (newValue) => {
    locale.value = newValue;
  },
  { immediate: true },
);

watch(
  () => locale.value,
  (newValue) => {
    lsLocale.value = newValue;
  },
);

const availableLocalesFiltered = computed(() =>
  availableLocales.filter(
    (availableLocale: string) => availableLocale !== locale.value,
  ),
);
</script>
