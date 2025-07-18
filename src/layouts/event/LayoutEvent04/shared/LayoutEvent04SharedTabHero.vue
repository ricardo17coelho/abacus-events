<template>
  <div v-if="currentEvent">
    <v-row>
      <v-col
        class="px-0 px-md-4 d-flex flex-column justify-space-between"
        cols="12"
        md="6"
      >
        <v-card class="d-flex flex-column" height="100%" variant="flat">
          <v-card-item v-if="smAndDown">
            <EventCarousel
              :height="mdAndUp ? 400 : 200"
              :images="currentEventBrandBannersUrls"
            />
          </v-card-item>

          <v-card-title>
            <div class="text-md-h4 font-weight-bold mb-2 text-h5">
              {{ showDefaultTranslationOrEmpty(currentEvent.title) }}
            </div>
          </v-card-title>

          <v-card-subtitle>
            <div class="text-md-h5 font-weight-bold mb-2 text-h6">
              {{ showDefaultTranslationOrEmpty(currentEvent.subtitle) }}
            </div>
          </v-card-subtitle>
          <v-card-text>
            <UiHtmlRender
              class="text-body-1 mb-2 text-medium-emphasis"
              :content="showDefaultTranslationOrEmpty(currentEvent.description)"
            />

            <EventDateChip :date="currentEvent.date" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="hidden-sm-and-down" cols="12" md="6">
        <div class="d-flex flex-column ga-6">
          <EventCarousel :images="currentEventBrandBannersUrls" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { UiHtmlRender } from '@lib/ui';
import EventCarousel from '@/components/event/event/EventCarousel.vue';
import { useDisplay } from 'vuetify/framework';
import EventDateChip from '@/components/event/EventDateChip.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { smAndDown, mdAndUp } = useDisplay();

const currentEventBrandBannersUrls = computed(
  () => currentEvent.value?.brand?.banners.map((i) => i.url) || [],
);
</script>
