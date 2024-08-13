<template>
  <v-container class="align-center">
    <AppImagesView :images="['/logos/abacus-summer-party-2024-banner.png']">
      <template #activator="activatorProps">
        <v-img
          v-bind="activatorProps"
          src="/logos/abacus-summer-party-2024-banner.png"
          max-height="400"
          cover
        >
        </v-img>
      </template>
    </AppImagesView>
  </v-container>
  <v-container class="align-center">
    <v-row>
      <v-col v-for="link in links" :key="link.id" cols="12" sm="6" lg="3">
        <v-card
          variant="tonal"
          color="primary"
          :to="link.to"
          height="100%"
          :density="$vuetify.display.xs ? 'compact' : 'default'"
        >
          <template #title>
            <v-card-title class="text-h6 text-sm-h5">
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
            <v-avatar rounded="0" size="40">
              <v-icon size="40" color="primary">{{ link.icon }}</v-icon>
            </v-avatar>
          </template>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          variant="tonal"
          color="primary"
          height="100%"
          :density="$vuetify.display.xs ? 'compact' : 'default'"
          @click="showGallery = true"
        >
          <template #title>
            <v-card-title class="text-h6 text-sm-h5">
              {{ $t('labels.plan') }}
            </v-card-title>
          </template>
          <template #append>
            <v-avatar rounded="0" size="40">
              <v-icon size="40" color="primary">mdi-map</v-icon>
            </v-avatar>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <AppImagesView v-model="showGallery" :images="['/images/plan.png']" />
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppLiveLabel from '../components/app/AppLiveLabel.vue';
import AppImagesView from '@/components/app/AppImagesView.vue';

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

const showGallery = ref(false);
</script>
