<template>
  <v-container class="align-center">
    <v-img src="/logos/abacus-summer-party-2024-banner.png"> </v-img>
  </v-container>
  <v-container class="align-center">
    <v-row>
      <v-col v-for="link in links" :key="link.id" cols="12" sm="6">
        <v-card variant="tonal" color="primary" :to="link.to">
          <template #title>
            <v-card-title class="text-h5"> {{ link.title }} </v-card-title>
          </template>
          <template #append>
            <v-avatar rounded="0" size="50">
              <v-icon size="50" color="primary">{{ link.icon }}</v-icon>
            </v-avatar>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const links = computed(() => [
  {
    id: 'program',
    title: 'Programm',
    icon: 'mdi-clipboard-text',
    to: { name: 'program' }
  },
  {
    id: 'parking',
    title: 'Parking',
    icon: 'mdi-car',
    to: { name: 'parking' }
  },
  {
    id: 'shuttle-schedule',
    title: 'Shuttle-Fahrplan',
    icon: 'mdi-bus',
    to: { name: 'shuttle-schedule' }
  }
]);
</script>
