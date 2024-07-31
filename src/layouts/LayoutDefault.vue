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
          <v-main>
            <v-container
              fluid
              class="overflow-auto"
              :class="{
                'main-container-with-footer': isRouteRoot,
                'main-container': !isRouteRoot
              }"
            >
              <RouterView />
            </v-container>
          </v-main>
        </v-row>
      </v-container>
    </v-layout>
    <v-footer
      v-if="isRouteRoot"
      class="d-flex flex-column bg-secondary-lighten-1"
    >
      <v-row justify="center" no-gutters>
        <v-col class="text-center text-body-2" cols="12">
          {{ new Date().getFullYear() }} © <strong>Abacus Research AG</strong>
          | C2
          <v-btn
            href="tel:+41 76 414 90 56"
            prepend-icon="mdi-phone"
            slim
            variant="text"
          >
            Sara Corradini
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import TheAppBar from '@/components/TheAppBar.vue';

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
  height: calc(100svh - 64px - 52px);
}
</style>
