<template>
  <v-app full-height>
    <v-layout
      class="app-container mx-auto"
      full-height
      max-width="1200"
      :min-width="$vuetify.display.width > 1200 ? 1200 : '100%'"
    >
      <TheAppBar />

      <v-main class="overflow-auto">
        <v-container
          fluid
          :class="{
            'main-container-with-footer': isRouteRoot,
            'main-container': !isRouteRoot
          }"
          class="overflow-auto"
        >
          <RouterView />
        </v-container>

        <TheFooter
          v-if="isRouteRoot"
          :app="$vuetify.display.smAndUp"
          absolute
        />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import TheAppBar from '@/components/TheAppBar.vue';
import TheFooter from '@/components/TheFooter.vue';

const route = useRoute();
const isRouteRoot = computed(() => route.path === '/');
</script>
<style scoped>
.app-container {
  height: calc(100svh - 64px);
}

.main-container {
  height: calc(100svh - 64px);
}

.main-container-with-footer {
  height: calc(100svh - 64px - 72px);
}
</style>
