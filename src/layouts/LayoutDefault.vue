<template>
  <v-app full-height>
    <v-layout full-height>

      <v-main class="text-slate-700 dark:text-slate-300">
        <v-container fluid class="overflow-auto bg-container">
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
</script>
<style scoped>
.bg-container {
  height: calc(100vh - 56px);
}
</style>
