<template>
  <TheAppBar />
  <v-main class="overflow-auto">
    <v-container class="app-container container">
      <RouterView />
    </v-container>
  </v-main>
  <TheFooter />
</template>

<script lang="ts" setup>
import TheAppBar from '@/layouts/components/TheAppBar.vue';
import TheFooter from '@/layouts/components/TheFooter.vue';
</script>
<style lang="scss" scoped>
.container {
  height: calc(100dvh - 64px - 64px);
}
</style>
