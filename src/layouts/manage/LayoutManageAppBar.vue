<template>
  <v-app-bar border="b" class="ps-4" flat>
    <v-app-bar-nav-icon v-if="mobile" @click="model = !model" />

    <v-app-bar-title>Abacus Events</v-app-bar-title>

    <template #append>
      <div class="d-flex ga-2 align-center">
        <v-btn class="me-2" height="48" icon>
          <v-avatar color="surface-light" size="32" :text="userInitials" />

          <v-menu activator="parent">
            <v-list density="compact" nav>
              <v-list-item
                append-icon="mdi-logout"
                link
                title="Logout"
                @click="logout"
              />
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import useAuthUser from '@/composables/auth-user.ts';

const model = defineModel({ type: Boolean, default: false });

const { mobile } = useDisplay();

const { userInitials, logout } = useAuthUser();
</script>
