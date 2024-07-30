<template>
  <v-app full-height>
    <v-container class="app-container py-0 mx-auto">
      <v-row>
        <v-col>
          <v-layout full-height max-width="1200">
            <TheAppBar />
            <v-main class="text-slate-700 dark:text-slate-300">
              <v-container fluid class="overflow-auto main-container">
                <RouterView />
              </v-container>
            </v-main>
          </v-layout>
        </v-col>
      </v-row>
      <v-footer class="d-flex flex-column">
        <div class="px-4 py-2 text-center w-100">
          <v-btn href="tel:+41 76 414 90 56" prepend-icon="mdi-phone" slim>
            Sara Corradini
          </v-btn>
        </div>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import TheAppBar from '@/components/TheAppBar.vue';
</script>
<style scoped>
.app-container {
  height: calc(100svh - 64px);
}

.main-container {
  height: calc(100svh - 64px - 64px);
}
</style>
