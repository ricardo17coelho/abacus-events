<template>
  <v-footer class="d-flex flex-column">
    <v-row justify="center" no-gutters>
      <v-col class="text-center text-caption" cols="12">
        {{ new Date().getFullYear() }} ©
        <strong>Abacus Research AG</strong>
        <v-divider vertical />
        | C2
        <span class="mx-1">
          |
          <VBtnPrimary
            v-if="isLoggedIn"
            size="x-small"
            :text="t('labels.logout')"
            variant="text"
            @click="logout"
          />
          <RouterLink
            v-else
            class="link-external"
            :to="{ name: 'auth-sign-in' }"
          >
            Admin
          </RouterLink>
        </span>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script lang="ts" setup>
import useAuthUser from '@/composables/auth-user.ts';
import { useI18n } from 'vue-i18n';

const { isLoggedIn, logout } = useAuthUser();
const { t } = useI18n();
</script>
