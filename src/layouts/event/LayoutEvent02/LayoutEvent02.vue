<template>
  <v-layout>
    <LayoutEvent02AppBar :scroll-container="`#${layoutMainContainerId}`" />

    <v-main class="overflow-auto">
      <v-container
        v-if="currentEvent"
        :id="layoutMainContainerId"
        class="main-container overflow-auto app-container pt-0"
        max-height="1200"
      >
        <v-container fluid>
          <v-row>
            <v-col
              class="px-md-4 d-flex flex-column justify-space-between"
              cols="12"
              md="6"
            >
              <v-card class="d-flex flex-column" height="100%" variant="flat">
                <template #title>
                  <div class="text-md-h4 font-weight-bold mb-2 text-h5">
                    {{ showDefaultTranslationOrEmpty(currentEvent.title) }}
                  </div>
                </template>
                <v-card-text>
                  <div class="text-body-1 mb-2 text-medium-emphasis">
                    {{
                      showDefaultTranslationOrEmpty(currentEvent.description)
                    }}
                  </div>
                  <v-chip color="primary">
                    {{ formatDateByFormat(currentEvent.date) }}
                  </v-chip>

                  <EventCarousel
                    v-if="smAndDown"
                    :height="mdAndUp ? 400 : 200"
                    :images="currentEventBrandBannersUrls"
                  />
                </v-card-text>
                <v-card-actions
                  v-if="hasEventFeature(currentEvent, 'GUEST_LIST')"
                  class="px-4"
                >
                  <VBtnPrimary
                    block
                    color="primary"
                    size="large"
                    :text="
                      showDefaultTranslationOrEmpty(
                        getEventFeatureIfExists(currentEvent, 'GUEST_LIST')
                          ?.title,
                      )
                    "
                    @click="
                      goTo(
                        `#feature-${
                          getEventFeatureIfExists(currentEvent, 'GUEST_LIST')
                            ?.id
                        }`,
                        { container: `#${layoutMainContainerId}` },
                      )
                    "
                  />
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col class="hidden-sm-and-down" cols="12" md="6">
              <div class="d-flex flex-column ga-6">
                <EventCarousel :images="currentEventBrandBannersUrls" />
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-container
          v-if="hasEventFeature(currentEvent, 'PROGRAM')"
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'PROGRAM')?.id}`"
          fluid
        >
          <div class="text-h4">Program</div>
          <v-chip-group
            v-if="categories.length > 0"
            v-model="currentCategoryFilter"
            class="categories-chip-group"
            color="primary"
            column
            mandatory
            mobile
          >
            <v-chip
              v-for="category in categories"
              :key="category.id"
              centered
              filter
              :prepend-icon="category.icon"
              :text="showDefaultTranslationOrEmpty(category.title)"
              :value="category.id"
              variant="outlined"
            />
          </v-chip-group>
          <EventTimeline01 :date="currentEvent.date" :items="sortedItems" />
        </v-container>
        <v-container
          v-if="hasEventFeature(currentEvent, 'GUEST_LIST')"
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'GUEST_LIST')?.id}`"
          fluid
        >
          <div class="text-h4">Anmeldung</div>
          <AppStateSoon />
        </v-container>
        <v-container
          v-if="hasEventFeature(currentEvent, 'SHUTTLE_PLAN')"
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'SHUTTLE_PLAN')?.id}`"
          fluid
        >
          <div class="text-h4">SHUTTLE_PLAN</div>
          <AppStateSoon />
        </v-container>
        <v-container
          v-if="hasEventFeature(currentEvent, 'PARKING')"
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'PARKING')?.id}`"
          fluid
        >
          <div class="text-h4">PARKING</div>
          <AppStateSoon />
        </v-container>
        <v-container
          v-if="hasEventFeature(currentEvent, 'FILES')"
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'FILES')?.id}`"
          fluid
        >
          <div class="text-h4">FILES</div>
          <AppStateSoon />
        </v-container>
        <UiBtnScrollToTop :scroll-container="`#${layoutMainContainerId}`" />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import LayoutEvent02AppBar from './LayoutEvent02AppBar.vue';
import { useDisplay, useGoTo } from 'vuetify';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import EventCarousel from '@/components/event/event/EventCarousel.vue';
import EventTimeline01 from '@/components/event/event-timeline/EventTimeline01.vue';
import useEventProgram from '@/composables/event-program.ts';
import AppStateSoon from '@/components/app/AppStateSoon.vue';
import { formatDateByFormat, UiBtnScrollToTop } from '@lib/ui';

const layoutMainContainerId = 'layout-main-container';
const { smAndDown, mdAndUp } = useDisplay();
const goTo = useGoTo();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const currentEventBrandBannersUrls = computed(
  () => currentEvent.value?.brand?.banners.map((i) => i.url) || [],
);

const { sortedItems, currentCategoryFilter, categories } = useEventProgram();
</script>
<style scoped>
.main-container {
  height: calc(100svh - 64px);
}
</style>
