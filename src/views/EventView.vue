<template>
  <v-container v-if="currentEvent" class="align-center">
    <AppTitle :title="showDefaultTranslationOrEmpty(currentEvent.title)" />
    <AppImagesView :images="[currentEvent.banner]">
      <template #activator="activatorProps">
        <v-img
          v-bind="activatorProps"
          class="rounded-lg"
          cover
          max-height="400"
          :src="currentEvent.banner"
        />
      </template>
    </AppImagesView>
  </v-container>
  <v-container class="align-center">
    <v-row>
      <v-col v-for="link in sortedLinks" :key="link.id" cols="12" lg="3" sm="6">
        <v-card
          color="primary"
          :density="xs ? 'compact' : 'default'"
          height="100%"
          :to="link.to"
          variant="tonal"
          @click="
            link.action && Object.keys(link).includes('action')
              ? link.action()
              : undefined
          "
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
              <v-icon color="primary" size="40">
                {{ link.icon }}
              </v-icon>
            </v-avatar>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <AppImagesView
      v-model="showGallery"
      :images="['/images/summer-part-2024/plan.png']"
    />
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppLiveLabel from '../components/app/AppLiveLabel.vue';
import AppImagesView from '@/components/app/AppImagesView.vue';
import AppTitle from '@/components/app/AppTitle.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { useDisplay } from 'vuetify';

const { t } = useI18n();
const { xs } = useDisplay();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const links = computed(() => [
  {
    id: 'program',
    title: t('home.links.program.title'),
    description: t('home.links.program.description'),
    icon: 'mdi-clipboard-text',
    show: () => true,
    to: { name: 'event-program' },
  },
  {
    id: 'parking',
    title: t('home.links.parking.title'),
    description: t('home.links.parking.description'),
    icon: 'mdi-car',
    show: () => true,
    to: { name: 'event-parking' },
  },
  {
    id: 'shuttle-schedule',
    title: t('home.links.shuttle_schedule.title'),
    description: t('home.links.shuttle_schedule.description'),
    icon: 'mdi-bus',
    show: () => true,
    to: { name: 'shuttle-schedule' },
  },
  {
    id: 'plan',
    title: t('labels.plan'),
    description: undefined,
    icon: 'mdi-map',
    show: () => true,
    action: () => {
      showGallery.value = true;
    },
  },
]);

const sortedLinks = computed(() => links.value.filter((l) => l.show()));

const showGallery = ref(false);
</script>
