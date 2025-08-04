<template>
  <TheAppBar />
  <v-main class="overflow-auto">
    <TheLayoutContainer class="container">
      <RouterView />
    </TheLayoutContainer>
  </v-main>
  <TheFooter />
</template>

<script lang="ts" setup>
import TheAppBar from '@/layouts/components/TheAppBar.vue';
import TheLayoutContainer from '@/layouts/components/TheLayoutContainer.vue';
import TheFooter from '@/layouts/components/TheFooter.vue';
</script>
<style lang="scss" scoped>
.container {
  height: calc(100vh - 64px - 64px);
}
</style>
