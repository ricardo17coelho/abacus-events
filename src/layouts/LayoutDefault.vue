<template>
  <v-app full-height>
    <TheAppBar />

    <v-main class="overflow-auto">
      <v-container
        class="main-container overflow-auto app-container pt-0"
        :class="{
          'main-container-with-footer': $vuetify.display.smAndUp && isRouteRoot
        }"
      >
        <RouterView />
      </v-container>
    </v-main>

    <TheFooter
      v-if="isRouteRoot"
      :app="$vuetify.display.smAndUp"
    />
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

.main-container-with-footer {
  height: calc(100svh - 64px - 52px);
}
</style>
