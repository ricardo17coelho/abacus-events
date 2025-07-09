<template>
  <v-container
    v-if="currentEvent"
    :id="layoutMainContainerId"
    class="app-container"
  >
    <!-- HERO SECTION -->
    <LayoutEvent04TabHero />

    <v-tabs v-model="currentTab" color="primary" density="compact" hide-slider>
      <v-tab
        v-for="tab in tabs"
        :key="tab.id"
        class="text-none me-2"
        :prepend-icon="tab.icon"
        rounded="lg"
        :text="showDefaultTranslationOrEmpty(tab.title)"
        :value="tab.id"
        variant="tonal"
      />
    </v-tabs>

    <v-tabs-window v-model="currentTab">
      <v-tabs-window-item :value="EVENT_FEATURE_TYPE.PROGRAM">
        <LayoutEvent04TabProgram />
      </v-tabs-window-item>

      <v-tabs-window-item :value="EVENT_FEATURE_TYPE.PARKING">
        <LayoutEvent04TabParking />
      </v-tabs-window-item>

      <v-tabs-window-item :value="EVENT_FEATURE_TYPE.SCHEDULE">
        <LayoutEvent04TabSchedule />
      </v-tabs-window-item>

      <v-tabs-window-item :value="EVENT_FEATURE_TYPE.FILES">
        <LayoutEvent04TabFiles />
      </v-tabs-window-item>
    </v-tabs-window>

    <UiBtnScrollToTop :scroll-container="`#${layoutMainContainerId}`" />
  </v-container>
</template>

<script lang="ts" setup>
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import { UiBtnScrollToTop } from '@lib/ui';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { EVENT_FEATURE_TYPE } from '@/api/types/EventFeature.ts';
import LayoutEvent04TabProgram from '@/layouts/event/LayoutEvent04/LayoutEvent04TabProgram.vue';
import LayoutEvent04TabSchedule from '@/layouts/event/LayoutEvent04/LayoutEvent04TabSchedule.vue';
import LayoutEvent04TabParking from '@/layouts/event/LayoutEvent04/LayoutEvent04TabParking.vue';
import LayoutEvent04TabFiles from '@/layouts/event/LayoutEvent04/LayoutEvent04TabFiles.vue';
import LayoutEvent04TabHero from '@/layouts/event/LayoutEvent04/LayoutEvent04TabHero.vue';
import { useI18n } from 'vue-i18n';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const layoutMainContainerId = 'layout-main-container';
const { t } = useI18n();

const currentTab = ref();

const tabs = computed(() => {
  if (!currentEvent.value) return [];
  const items = [];

  const featureProgram = getEventFeatureIfExists(currentEvent.value, 'PROGRAM');
  if (featureProgram) {
    items.push({
      id: EVENT_FEATURE_TYPE.PROGRAM,
      title: featureProgram.title || t('labels.features.PROGRAM'),
      icon: featureProgram.icon,
      show: () => hasEventFeature(currentEvent.value!, 'PROGRAM'),
    });
  }

  const featureParking = getEventFeatureIfExists(currentEvent.value, 'PARKING');
  if (featureParking) {
    items.push({
      id: EVENT_FEATURE_TYPE.PARKING,
      title: featureParking.title || t('labels.features.PARKING'),
      icon: featureParking.icon,
      show: () => hasEventFeature(currentEvent.value!, 'PARKING'),
    });
  }

  const featureSchedule = getEventFeatureIfExists(
    currentEvent.value,
    'SCHEDULE',
  );
  if (featureSchedule) {
    items.push({
      id: EVENT_FEATURE_TYPE.SCHEDULE,
      title: featureSchedule.title || t('labels.features.SCHEDULE'),
      icon: featureSchedule.icon,
      show: () => hasEventFeature(currentEvent.value!, 'SCHEDULE'),
    });
  }

  const featureFiles = getEventFeatureIfExists(currentEvent.value, 'FILES');
  if (featureFiles) {
    items.push({
      id: EVENT_FEATURE_TYPE.FILES,
      title: featureFiles.title || t('labels.features.FILES'),
      icon: featureFiles.icon,
      show: () => hasEventFeature(currentEvent.value!, 'FILES'),
    });
  }

  const featureGuestList = getEventFeatureIfExists(
    currentEvent.value,
    'GUEST_LIST',
  );
  if (featureGuestList) {
    items.push({
      id: EVENT_FEATURE_TYPE.GUEST_LIST,
      title: featureGuestList.title || t('labels.features.GUEST_LIST'),
      icon: featureGuestList.icon,
      show: () => hasEventFeature(currentEvent.value!, 'GUEST_LIST'),
    });
  }

  return items.filter((i) => (i.show ? i.show() : true));
});
</script>
