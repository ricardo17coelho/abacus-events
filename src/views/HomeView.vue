<template>
  <v-container class="align-center">
    <v-img src="/logos/abacus-summer-party-2024-banner.png"> </v-img>
  </v-container>
  <v-container class="align-center">
    <v-row>
      <v-col v-for="link in links" :key="link.id" cols="12" sm="6">
        <v-card variant="tonal" color="primary" :to="link.to" height="100%">
          <template #title>
            <v-card-title class="text-h5">
              {{ link.title }}
              <v-icon
                v-if="link.id === 'parking'"
                class="flash mb-2"
                size="20"
                color="red"
              >
                mdi-broadcast
              </v-icon>
            </v-card-title>
          </template>
          <template #subtitle>
            <v-card-subtitle class="text-wrap">
              {{ link.description }}
            </v-card-subtitle>
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
    description: 'LineUp, F&B, allgemeine Info`s',
    icon: 'mdi-clipboard-text',
    to: { name: 'program' }
  },
  {
    id: 'parking',
    title: 'Parking',
    description: 'Live Verfügbarkeit PP & Standorte',
    icon: 'mdi-car',
    to: { name: 'parking' }
  },
  {
    id: 'shuttle-schedule',
    title: 'Shuttle-Fahrplan',
    description: 'Timetable und Stop`s',
    icon: 'mdi-bus',
    to: { name: 'shuttle-schedule' }
  }
]);
</script>

<style scoped lang="scss">
@keyframes flash {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}

.flash {
  display: inline-block;
  animation: flash 4s infinite;
  color: rgb(var(--v-theme-error));
}
</style>
