<template>
  <v-app full-height>
    <v-layout
      class="app-container mx-auto"
      full-height
      max-width="1200"
      :min-width="$vuetify.display.width > 1200 ? 1200 : '100%'"
    >
      <TheAppBar />
      <v-container class="py-0 mx-auto">
        <v-row align="center" justify="center" class="fill-height">
          <v-main class="text-slate-700 dark:text-slate-300">
            <v-container fluid class="overflow-auto main-container">
              <RouterView />
            </v-container>
          </v-main>
        </v-row>
      </v-container>
    </v-layout>
    <v-footer class="d-flex flex-column">
      <div class="px-4 py-2 text-center w-100">
        <v-btn href="tel:+41 76 414 90 56" prepend-icon="mdi-phone" slim>
          Sara Corradini
        </v-btn>
      </div>
    </v-footer>
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
  height: calc(100svh - 64px - 52px);
}
</style>
