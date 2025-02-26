<template>
  <v-app full-height>
    <LayoutEventAppBar />

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

    <LayoutEventFooter v-if="isRouteRoot" :app="smAndUp" />
  </v-app>
</template>

<script lang="ts" setup>
import LayoutEventAppBar from '@/layouts/event/LayoutEventAppBar.vue';
import LayoutEventFooter from '@/layouts/event/LayoutEventFooter.vue';
import { useDisplay } from 'vuetify';

const route = useRoute();
const { smAndUp } = useDisplay();

const isRouteRoot = computed(() => route.path === '/');
</script>
<style scoped>
.main-container {
  height: calc(100svh - 64px);
}

.main-container-with-footer {
  height: calc(100svh - 64px - 52px);
}
</style>
