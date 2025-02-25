<template>
  <ContainerCentered>
    <v-card :width="xs ? undefined : '500'">
      <template #prepend>
        <v-btn
          icon="mdi-arrow-left"
          slim
          to="/"
        />
      </template>
      <template #title>
        <v-card-title>
          <h1 class="mx-auto text-h4 font-bold">
            Aba Summer Party
          </h1>
        </v-card-title>
      </template>
      <v-card-text>
        <router-view />
      </v-card-text>
    </v-card>
  </ContainerCentered>
</template>
<script lang="ts" setup>
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();
</script>
