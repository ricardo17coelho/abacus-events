<template>
  <v-container v-if="currentEvent" class="align-center">
    <AppTitle :title="showDefaultTranslationOrEmpty(currentEvent.title)" />
    <AppImagesView
      v-if="currentEventBrandBannersUrls.length > 0"
      :images="currentEventBrandBannersUrls"
      :init-index="carouselModel"
    >
      <template #activator="activatorProps">
        <v-carousel
          v-model="carouselModel"
          cycle
          height="400"
          hide-delimiter-background
          show-arrows="hover"
        >
          <v-carousel-item
            v-for="bannerUrl in currentEventBrandBannersUrls"
            v-bind="activatorProps"
            :key="bannerUrl"
            :src="bannerUrl"
          >
          </v-carousel-item>
        </v-carousel>
      </template>
    </AppImagesView>
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
      v-if="eventAttachments && !!eventAttachments.length"
      v-model="showGallery"
      :images="eventAttachments"
    />
  </v-container>
</template>

<script setup lang="ts">
import AppImagesView from '@/components/app/AppImagesView.vue';
import AppTitle from '@/components/app/AppTitle.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import EventFeatureCard from '@/components/event/event-feature/EventFeatureCard.vue';
import { type EventFeatureTypes } from '@/api/types/EventFeature.ts';
import useApiEvents from '@/api/events.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const currentEventBrandBannersUrls = computed(
  () => currentEvent.value?.brand?.banners.map((i) => i.url) || [],
);

const carouselModel = ref(0);

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
    case 'ATTACHMENTS':
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

const { getEventById } = useApiEvents();
const eventAttachments = computedAsync<string[]>(async () => {
  if (
    currentEvent.value?.features &&
    currentEvent.value.features.map((i) => i.feature_id).includes('ATTACHMENTS')
  ) {
    // TODO: fetch event attachments
    await getEventById(currentEvent.value?.id);
    return ['/images/summer-part-2024/plan.png'];
  }
}, []);
</script>
