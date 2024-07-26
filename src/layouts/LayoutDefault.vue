<template>
  <v-app full-height>
    <v-container class="fill-height py-0 mx-auto">
      <v-row>
        <v-col align="center">
          <v-layout full-height max-width="1200">
            <TheAppBar />
            <v-main class="text-slate-700 dark:text-slate-300">
              <v-container fluid class="overflow-auto bg-container">
                <RouterView />
              </v-container>
            </v-main>
          </v-layout>
        </v-col>
      </v-row>
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
