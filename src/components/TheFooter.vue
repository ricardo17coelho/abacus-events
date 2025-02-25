<template>
  <v-footer class="d-flex flex-column">
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="text-center text-caption"
        cols="12"
      >
        {{ new Date().getFullYear() }} ©
        <strong>Abacus Research AG</strong>
        <v-divider vertical />
        | C2
        <span class="mx-1">
          |
          <RouterLink
            v-if="!isLoggedIn"
            :to="{ name: 'auth-sign-in' }"
            class="link-external"
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

const { isLoggedIn } = useAuthUser();
</script>
