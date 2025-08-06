<template>
  <v-row justify="center" no-gutters>
    <v-col class="text-center text-caption" cols="12">
      <TheFooterPolicy />
      <span class="mx-1">
        |
        <VBtnPrimary
          v-if="isLoggedIn"
          size="x-small"
          :text="t('labels.logout')"
          variant="text"
          @click="logout"
        />
        <RouterLink v-else class="link-external" :to="{ name: 'auth-sign-in' }">
          Admin
        </RouterLink>
      </span>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import useAuthUser from '@/composables/auth-user.ts';
import { useI18n } from 'vue-i18n';
import TheFooterPolicy from '@/layouts/components/TheFooterPolicy.vue';

const { isLoggedIn, logout } = useAuthUser();
const { t } = useI18n();
</script>
