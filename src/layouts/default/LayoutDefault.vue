<template>
  <v-layout>
    <LayoutDefaultDrawer v-model="drawer" />

    <LayoutDefaultAppBar v-model="drawer" />

    <v-main class="overflow-auto">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import LayoutDefaultDrawer from '@/layouts/default/LayoutDefaultDrawer.vue';
import LayoutDefaultAppBar from '@/layouts/default/LayoutDefaultAppBar.vue';

const drawer = shallowRef(true);
</script>
