<template>
  <v-container v-if="currentEvent" class="align-center">
    <TheAppTitle :title="showDefaultTranslationOrEmpty(currentEvent.title)" />
    <EventCarousel :images="currentEventBrandBannersUrls" />
  </v-container>
  <v-container class="align-center">
    <v-row>
      <v-col
        v-for="feature in eventFeatures"
        :key="feature.id"
        cols="12"
        lg="3"
        sm="6"
      >
        <EventFeatureCard
          can-show-live-label
          :feature="feature"
          :to="feature.to"
          @click="
            feature.action && Object.keys(feature).includes('action')
              ? feature.action()
              : undefined
          "
        >
        </EventFeatureCard>
      </v-col>
    </v-row>
    <AppImagesView
      v-if="eventFiles && !!eventFiles.length"
      v-model="showGallery"
      :images="eventFiles"
    />
  </v-container>
</template>

<script setup lang="ts">
import AppImagesView from '@/components/app/AppImagesView.vue';
import TheAppTitle from '@/components/app/TheAppTitle.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import EventFeatureCard from '@/components/event/event-feature/EventFeatureCard.vue';
import { type EventFeatureTypes } from '@/api/types/EventFeature.ts';
import EventCarousel from '@/components/event/event/EventCarousel.vue';
import useApiEventFile from '@/api/event-file.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const currentEventBrandBannersUrls = computed(
  () => currentEvent.value?.brand?.banners.map((i) => i.url) || [],
);

function getEventFeatureLinkOrAction(feature: EventFeatureTypes) {
  switch (feature) {
    case 'PROGRAM':
      return {
        to: {
          name: 'event-program',
        },
      };
    case 'PARKING':
      return {
        to: {
          name: 'event-parking',
        },
      };
    case 'SHUTTLE_PLAN':
      return { to: { name: 'event-shuttle-plan' } };
    case 'FILES':
      return {
        action: () => {
          showGallery.value = true;
        },
      };
    // no default
  }
}

const eventFeatures = computed(() =>
  currentEvent.value?.features
    .filter((f) => f.enabled === true)
    .map((i) => {
      return {
        ...i,
        ...getEventFeatureLinkOrAction(i.feature_id),
      };
    }),
);

const showGallery = ref(false);

const { getEventFilesByEventId } = useApiEventFile();
const eventFiles = computedAsync<string[]>(async () => {
  if (
    currentEvent.value?.features &&
    currentEvent.value.features.map((i) => i.feature_id).includes('FILES')
  ) {
    // TODO: fetch event attachments
    const { data } = await getEventFilesByEventId(currentEvent.value?.id);
    if (data) {
      return data.map((item) => item.url);
    }
  }
}, []);
</script>
