<template>
  <v-layout>
    <LayoutEvent02AppBar :scroll-container="`#${layoutMainContainerId}`" />

    <v-main scrollable>
      <v-container
        v-if="currentEvent"
        :id="layoutMainContainerId"
        class="main-container overflow-auto app-container"
      >
        <!-- HERO SECTION -->
        <div>
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
                    :content="
                      showDefaultTranslationOrEmpty(currentEvent.description)
                    "
                  />

                  <v-chip color="primary">
                    {{ formatDateByFormat(currentEvent.date) }}
                  </v-chip>
                </v-card-text>
                <v-card-actions
                  v-if="hasEventFeature(currentEvent, 'PROGRAM')"
                  class="px-4"
                >
                  <VBtnPrimary
                    block
                    color="primary"
                    size="large"
                    :text="
                      showDefaultTranslationOrEmpty(
                        getEventFeatureIfExists(currentEvent, 'PROGRAM')?.title,
                      )
                    "
                    @click="
                      goTo(
                        `#feature-${
                          getEventFeatureIfExists(currentEvent, 'PROGRAM')?.id
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
        </div>
        <!-- PROGRAM -->
        <div
          v-if="hasEventFeature(currentEvent, 'PROGRAM')"
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'PROGRAM')?.id}`"
        >
          <EventFeatureDisplayCard
            :feature="getEventFeatureIfExists(currentEvent, 'PROGRAM')"
          >
            <v-card-text>
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
            </v-card-text>
          </EventFeatureDisplayCard>
        </div>
        <!-- SCHEDULE -->
        <div
          v-if="hasEventFeature(currentEvent, 'SCHEDULE')"
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'SCHEDULE')?.id}`"
        >
          <EventFeatureDisplayCard
            :feature="getEventFeatureIfExists(currentEvent, 'SCHEDULE')"
          >
            <v-card-text>
              <EventScheduleDisplay01 />
            </v-card-text>
          </EventFeatureDisplayCard>
        </div>
        <!-- PARKING -->
        <div
          v-if="
            hasEventFeature(currentEvent, 'PARKING') &&
            currentEvent.parking_lots.length
          "
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'PARKING')?.id}`"
        >
          <EventFeatureDisplayCard
            :feature="getEventFeatureIfExists(currentEvent, 'PARKING')"
          >
            <v-card-text>
              <v-row>
                <v-col
                  v-for="parkingLot in currentEvent.parking_lots"
                  :key="parkingLot.id"
                  cols="12"
                  lg="4"
                >
                  <ParkingLotCard :parking-lot="parkingLot" />
                </v-col>
              </v-row>
            </v-card-text>
          </EventFeatureDisplayCard>
        </div>
        <!-- FILES -->
        <div
          v-if="
            hasEventFeature(currentEvent, 'FILES') && currentEvent.files.length
          "
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'FILES')?.id}`"
        >
          <EventFeatureDisplayCard
            :feature="getEventFeatureIfExists(currentEvent, 'FILES')"
          >
            <v-card-text>
              <EventFilesLayout01 :files="currentEvent.files" />
            </v-card-text>
          </EventFeatureDisplayCard>
        </div>
        <UiBtnScrollToTop :scroll-container="`#${layoutMainContainerId}`" />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
// components
import LayoutEvent02AppBar from './LayoutEvent02AppBar.vue';
import EventFilesLayout01 from '@/components/event/event-files/layouts/EventFilesLayout01.vue';
import EventCarousel from '@/components/event/event/EventCarousel.vue';
import EventTimeline01 from '@/components/event/event-timeline/EventTimeline01.vue';
import ParkingLotCard from '@/components/parking-lot/ParkingLotCard.vue';
import EventScheduleDisplay01 from '@/components/event/event-schedule/event-schedule-display/EventScheduleDisplay01.vue';
import EventFeatureDisplayCard from '@/components/event/event-feature/event-feature-display/EventFeatureDisplayCard.vue';
// composables
import { useDisplay, useGoTo } from 'vuetify';
import useEventProgram from '@/composables/event-program.ts';
// types & constants
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
// utilities
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import { formatDateByFormat, UiBtnScrollToTop, UiHtmlRender } from '@lib/ui';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';

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
