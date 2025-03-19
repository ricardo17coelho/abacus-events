<template>
  <v-layout>
    <TheAppBar />

    <v-main class="overflow-auto">
      <TheLayoutContainer>
        <RouterView />
      </TheLayoutContainer>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import TheAppBar from '@/layouts/components/TheAppBar.vue';
import TheLayoutContainer from '@/layouts/components/TheLayoutContainer.vue';
</script>
