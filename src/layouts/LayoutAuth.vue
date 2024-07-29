<template>
  <ContainerCentered>
    <v-card :width="$vuetify.display.xs ? undefined : '500'">
      <v-card-title>
        <h1 class="mx-auto text-h4 font-bold">Aba Summer Party</h1>
      </v-card-title>
      <v-card-text>
        <router-view />
      </v-card-text>
    </v-card>
  </ContainerCentered>
</template>
<script lang="ts" setup>
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
</script>
