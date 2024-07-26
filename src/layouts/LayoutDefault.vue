<template>
  <v-app full-height>
    <v-container class="fill-height grid-list-md py-0">
      <v-layout full-height max-width="1200">
        <TheAppBar />
        <v-main class="text-slate-700 dark:text-slate-300">
          <v-container fluid class="overflow-auto bg-container">
            <RouterView />
          </v-container>
        </v-main>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import TheAppBar from '@/components/TheAppBar.vue';
</script>
<style scoped>
.bg-container {
  height: calc(100svh - 64px);
}
</style>
