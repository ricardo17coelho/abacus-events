<template>
  <v-app-bar
    flat
    class="px-1"
  >
    <v-container class="d-flex align-center py-0 app-container">
      <router-link to="/">
        <v-img
          src="/logos/abacus.svg"
          max-width="200"
          width="150"
        />
      </router-link>
      <v-btn
        v-if="isCurrentUserAdminOrHelper"
        class="ml-2"
        icon="mdi-view-dashboard"
        :to="{ name: 'dashboard' }"
      />
      <v-spacer />
      <div
        class="d-flex"
        :class="{
          'ga-1': xs,
          'ga-5': smAndUp
        }"
      >
        <v-btn
          color="primary"
          href="tel:+41 76 414 90 56"
          icon="mdi-phone"
          slim
          size="small"
          variant="text"
        />
        <MenuLanguage
          v-model="locale"
          :available-locales="availableLocalesFiltered"
          hide-full-text
        />

        <VBtnPrimary
          v-if="currentUser"
          :icon="xs ? 'mdi-logout' : undefined"
          :size="xs ? 'small' : undefined"
          :text="smAndUp ? t('labels.logout') : undefined"
          @click="logout"
        />
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/auth-user';
import { useAuthStore } from '@/stores/auth';
import MenuLanguage from './MenuLanguage.vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

const { currentUser, isCurrentUserAdminOrHelper } = useAuthStore();
const { logout } = useAuthUser();

const { locale, availableLocales, t } = useI18n();
const { xs, smAndUp } = useDisplay();

const lsLocale = useLocalStorage('locale', locale.value);

watch(
  () => lsLocale.value,
  (newValue) => {
    locale.value = newValue;
  },
  { immediate: true }
);

watch(
  () => locale.value,
  (newValue) => {
    lsLocale.value = newValue;
  }
);

const availableLocalesFiltered = computed(() =>
  availableLocales.filter(
    (availableLocale: string) => availableLocale !== locale.value
  )
);
</script>
