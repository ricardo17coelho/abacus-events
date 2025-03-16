<template>
  <v-layout>
    <LayoutManageDrawer v-model="drawer" />

    <LayoutManageAppBar v-model="drawer" />

    <v-main class="overflow-auto">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import LayoutManageDrawer from './LayoutManageDrawer.vue';
import LayoutManageAppBar from './LayoutManageAppBar.vue';

const drawer = shallowRef(true);
</script>
