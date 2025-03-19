<template>
  <v-container class="align-center">
    <v-row>
      <v-col align="center">
        <AppTitle show-go-home-button :title="t('title.shuttle_schedule')" />
      </v-col>
    </v-row>
    <ContainerCentered class="px-0">
      <v-card class="px-2" flat max-width="500">
        <v-alert
          border="start"
          class="my-6"
          density="compact"
          rounded="lg"
          type="warning"
          variant="tonal"
        >
          <div>
            {{ t('views.shuttle_schedule.info_01') }}
          </div>
          <i18n-t keypath="views.shuttle_schedule.info_02" tag="div">
            <template #link>
              <a class="link-external" href="https://www.sbb.ch/"> SBB </a>
            </template>
          </i18n-t>
        </v-alert>
        <v-alert border="start" class="my-6" density="compact" rounded="lg">
          <v-icon>mdi-information-variant-circle-outline</v-icon>
          {{ t('views.shuttle_schedule.alert_01') }}
        </v-alert>
        <v-card class="my-6">
          <template #title>
            <v-icon color="primary" size="x-small"> mdi-bus-clock </v-icon>
            {{ t('labels.outward_journey') }}
          </template>
          <template #subtitle>
            <div class="text-wrap">
              {{ t('views.shuttle_schedule.outward_journey.info') }}
            </div>
          </template>
          <v-card-item>
            <EventShuttlePlanTimeline :items="itemsOutward" />
          </v-card-item>
        </v-card>

        <v-card class="my-6">
          <template #title>
            <v-icon color="primary" size="x-small"> mdi-bus-clock </v-icon>
            {{ t('labels.return_journey') }}
          </template>
          <template #subtitle>
            <div class="text-wrap">
              {{ t('views.shuttle_schedule.return_journey.info') }}
            </div>
          </template>

          <v-card-item>
            <EventShuttlePlanTimeline :items="itemsReturn" />
          </v-card-item>
        </v-card>
      </v-card>
    </ContainerCentered>
  </v-container>
</template>

<script setup lang="ts">
import AppTitle from '@/components/app/AppTitle.vue';
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
import { useI18n } from 'vue-i18n';
import EventShuttlePlanTimeline from '@/components/event/event-shuttle-plan/EventShuttlePlanTimeline.vue';

const { t } = useI18n();

const itemsOutward = computed(() => [
  {
    location: 'Hauptbahnhof St. Gallen- Lagerstrasse, 9000 St. Gallen',
    location_link: 'https://maps.app.goo.gl/uWM6UuKsAZzeYGnJA',
  },
  {
    location: 'Hodlertrasse, 9008 St. Gallen (St. Fiden PP)',
    location_link: 'https://maps.app.goo.gl/E7ad57eY74PiDWRj8',
  },
  {
    location: 'Abacus, Wittenbach',
    location_link: 'https://maps.app.goo.gl/132fBr3KKb8cczPWA',
  },
]);

const itemsReturn = computed(() => [
  {
    location: 'Abacus, Wittenbach',
    location_link: 'https://maps.app.goo.gl/132fBr3KKb8cczPWA',
  },
  {
    location: 'Hodlertrasse, 9008 St. Gallen (St. Fiden PP)',
    location_link: 'https://maps.app.goo.gl/E7ad57eY74PiDWRj8',
  },
  {
    location: `Radisson (${t('labels.stop_on_request')})`,
    location_link: 'https://maps.app.goo.gl/DorgNiRHPizxKwnU7',
  },
  {
    location: 'Hauptbahnhof St. Gallen- Lagerstrasse, 9000 St. Gallen',
    location_link: 'https://maps.app.goo.gl/uWM6UuKsAZzeYGnJA',
  },
]);
</script>
