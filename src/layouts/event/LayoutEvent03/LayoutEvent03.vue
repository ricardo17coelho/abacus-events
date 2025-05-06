<template>
  <v-layout>
    <!-- App Bar Section -->
    <v-navigation-drawer v-model="drawer" disable-resize-watcher>
      <v-list nav>
        <v-list-item
          v-for="item in appBarItems"
          :key="item.key"
          base-color="primary"
          link
          rounded="lg"
          :title="item.title"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="transparent" flat>
      <template v-if="smAndDown" #prepend>
        <v-app-bar-nav-icon v-if="smAndDown" @click="drawer = !drawer" />
      </template>

      <div class="d-md-flex d-none ga-4 mx-auto align-center justify-center">
        <VBtnPrimary
          v-for="item in appBarItems"
          :key="item.key"
          class="text-none"
          :text="item.title"
          variant="text"
        />
      </div>
    </v-app-bar>

    <v-main class="overflow-auto">
      <v-container
        v-if="currentEvent"
        :id="layoutMainContainerId"
        class="main-container overflow-auto app-container pt-0"
      >
        <!-- Hero Section -->
        <v-container class="h-100 position-relative">
          <v-responsive
            content-class="d-flex align-center justify-center"
            height="500"
          >
            <div class="w-100 w-md-50 text-center">
              <v-chip border="thin opacity-25" color="surface" variant="flat">
                {{ formatDateByFormat(currentEvent.date) }}
              </v-chip>

              <h1 class="text-h4 text-md-h2 font-weight-bold my-6">
                {{ showDefaultTranslationOrEmpty(currentEvent.title) }}
              </h1>

              <div class="text-body-1 text-medium-emphasis mb-10">
                {{ showDefaultTranslationOrEmpty(currentEvent.description) }}
              </div>

              <div class="d-flex ga-4 justify-center">
                <v-btn
                  class="text-none"
                  color="primary"
                  flat
                  rounded="lg"
                  text="Get started"
                  @click="
                    goTo(
                      `#feature-${
                        getEventFeatureIfExists(currentEvent, 'PROGRAM')?.id
                      }`,
                      { container: `#${layoutMainContainerId}` },
                    )
                  "
                />
              </div>
            </div>

            <div class="v-bg position-absolute top-0 right-0 left-0 bottom-0">
              <div
                aria-hidden="true"
                class="overflow-hidden opacity-20 w-100 h-100"
              />
            </div>
          </v-responsive>
        </v-container>

        <!-- PROGRAM -->
        <v-container
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'PROGRAM')?.id}`"
          class="pa-md-12 pa-6"
          fluid
        >
          <div class="text-h4 my-4 text-center">
            {{ t('labels.features.PROGRAM') }}
          </div>
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

        <!-- CONTACTS -->
        <v-container
          v-if="
            hasEventFeature(currentEvent, 'CONTACTS') &&
            currentEvent.contacts.length
          "
          :id="`feature-${getEventFeatureIfExists(currentEvent, 'CONTACTS')?.id}`"
          class="pa-md-12 pa-6"
          fluid
        >
          <div class="text-h4 text-center my-4">
            {{ t('labels.features.CONTACTS') }}
          </div>

          <EventContactsLayout02 :contacts="currentEvent.contacts" />
        </v-container>
        <UiBtnScrollToTop :scroll-container="`#${layoutMainContainerId}`" />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { formatDateByFormat, type MenuItem, UiBtnScrollToTop } from '@lib/ui';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import { useGoTo } from 'vuetify/framework';
import EventTimeline01 from '@/components/event/event-timeline/EventTimeline01.vue';
import useEventProgram from '@/composables/event-program.ts';
import { useI18n } from 'vue-i18n';
import { EVENT_FEATURE_TYPE } from '@/api/types/EventFeature.ts';
import EventContactsLayout02 from '@/components/event/event-contacts/layouts/EventContactsLayout02.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { smAndDown } = useDisplay();
const goTo = useGoTo();
const { t } = useI18n();

const layoutMainContainerId = 'layout-main-container';

// const currentEventBrandBannersUrls = computed(
//   () => currentEvent.value?.brand?.banners.map((i) => i.url) || [],
// );

const { sortedItems, currentCategoryFilter, categories } = useEventProgram();

// Define Values for Appbar Section
const drawer = ref(false);

const appBarItems = computed<MenuItem[]>(() =>
  currentEvent.value?.features
    .filter((i) =>
      [EVENT_FEATURE_TYPE.PROGRAM, EVENT_FEATURE_TYPE.CONTACTS].includes(
        i.feature_id,
      ),
    )
    .map((feature) => {
      return {
        ...feature,
        title: showDefaultTranslationOrEmpty(feature.title),
        key: feature.id,
        action: () => {
          const target = `#feature-${feature.id}`;
          goTo(target, { container: layoutMainContainerId });
        },
      };
    }),
);
</script>

<style lang="scss" scoped>
.v-bg {
  filter: blur(56px);
  pointer-events: none;
}

.v-bg > div {
  background: linear-gradient(
    to bottom right,
    rgb(var(--v-theme-primary)),
    rgb(var(--v-theme-error))
  );
  z-index: -10;
  clip-path: polygon(
    20% 50%,
    27% 66%,
    41% 66%,
    50% 50%,
    41% 34%,
    27% 34%,
    20% 50%,
    55% 50%,
    62% 66%,
    76% 66%,
    85% 50%,
    76% 34%,
    62% 34%,
    55% 50%,
    30% 50%,
    37% 66%,
    51% 66%,
    60% 50%,
    51% 34%,
    37% 34%,
    30% 50%
  );
}
</style>
