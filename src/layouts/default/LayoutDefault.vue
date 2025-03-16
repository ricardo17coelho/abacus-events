<template>
  <v-layout>
    <TheAppBar />

    <v-main class="overflow-auto">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import TheAppBar from '@/layouts/components/TheAppBar.vue';
</script>
