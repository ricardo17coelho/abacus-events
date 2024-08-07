<template>
  <v-container class="align-center">
    <v-img src="/logos/abacus-summer-party-2024-banner.png" max-height="600">
    </v-img>
  </v-container>
  <v-container class="align-center">
    <v-row>
      <v-col v-for="link in links" :key="link.id" cols="12" sm="6" lg="4">
        <v-card variant="tonal" color="primary" :to="link.to" height="100%">
          <template #title>
            <v-card-title class="text-h5">
              {{ link.title }}
              <AppLiveLabel v-if="link.id === 'parking'" />
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
import { useI18n } from 'vue-i18n';
import AppLiveLabel from '../components/app/AppLiveLabel.vue';

const { t } = useI18n();

const links = computed(() => [
  {
    id: 'program',
    title: t('home.links.program.title'),
    description: t('home.links.program.description'),
    icon: 'mdi-clipboard-text',
    to: { name: 'program' }
  },
  {
    id: 'parking',
    title: t('home.links.parking.title'),
    description: t('home.links.parking.description'),
    icon: 'mdi-car',
    to: { name: 'parking' }
  },
  {
    id: 'shuttle-schedule',
    title: t('home.links.shuttle_schedule.title'),
    description: t('home.links.shuttle_schedule.description'),
    icon: 'mdi-bus',
    to: { name: 'shuttle-schedule' }
  }
]);
</script>
