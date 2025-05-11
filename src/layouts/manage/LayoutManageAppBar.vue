<template>
  <v-app-bar border="b" class="ps-4" flat>
    <v-app-bar-nav-icon v-if="mobile" @click="model = !model" />

    <v-app-bar-title>Abacus Events</v-app-bar-title>

    <template #append>
      <TheAppMenuLanguage />
      <div class="d-flex ga-2 align-center">
        <TheUserMenu />
      </div>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import TheAppMenuLanguage from '@/components/TheAppMenuLanguage.vue';
import TheUserMenu from '@/layouts/components/TheUserMenu.vue';

const model = defineModel({ type: Boolean, default: false });

const { mobile } = useDisplay();
</script>
