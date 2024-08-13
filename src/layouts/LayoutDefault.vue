<template>
  <v-app full-height>
    <TheAppBar />

    <v-main class="overflow-auto">
      <v-container class="main-container overflow-auto app-container">
        <RouterView />
      </v-container>
    </v-main>

    <TheFooter v-if="isRouteRoot" :app="$vuetify.display.smAndUp" absolute />
  </v-app>
</template>

<script lang="ts" setup>
import TheAppBar from '@/components/TheAppBar.vue';
import TheFooter from '@/components/TheFooter.vue';

const route = useRoute();
const isRouteRoot = computed(() => route.path === '/');
</script>
<style scoped>
.main-container {
  height: calc(100svh - 64px);
}
</style>
