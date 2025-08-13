<template>
  <v-layout>
    <LayoutEvent01AppBar />

    <v-main class="overflow-auto">
      <v-container
        class="main-container overflow-auto app-container pt-0"
        :class="{
          'main-container-with-footer': smAndUp && isRouteRoot,
        }"
      >
        <RouterView />
      </v-container>
    </v-main>

    <TheFooter v-if="isRouteRoot" :app="smAndUp" />
  </v-layout>
</template>

<script lang="ts" setup>
import LayoutEvent01AppBar from './LayoutEvent01AppBar.vue';
import { useDisplay } from 'vuetify';
import TheFooter from '@/layouts/components/TheFooter.vue';

const route = useRoute();
const { smAndUp } = useDisplay();

const isRouteRoot = computed(() => route.path === '/');
</script>
<style scoped>
.main-container {
  height: calc(100dvh - 64px);
}

.main-container-with-footer {
  height: calc(100dvh - 64px - 52px);
}
</style>
