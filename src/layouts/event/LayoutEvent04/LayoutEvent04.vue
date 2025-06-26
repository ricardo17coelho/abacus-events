<template>
  <v-main scrollable>
    <v-container
      v-if="currentEvent"
      :id="layoutMainContainerId"
      class="app-container"
    >
      <!-- HERO SECTION -->
      <LayoutEvent04TabHero v-if="!smAndDown" />

      <v-tabs
        v-if="!smAndDown"
        v-model="currentTab"
        color="primary"
        density="compact"
        hide-slider
      >
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
        <v-tabs-window-item value="overview">
          <LayoutEvent04TabHero />
        </v-tabs-window-item>

        <v-tabs-window-item :value="EVENT_FEATURE_TYPE.PROGRAM">
          <LayoutEvent04TabProgram />
        </v-tabs-window-item>

        <v-tabs-window-item :value="EVENT_FEATURE_TYPE.SCHEDULE">
          <LayoutEvent04TabSchedule />
        </v-tabs-window-item>

        <v-tabs-window-item :value="EVENT_FEATURE_TYPE.PARKING">
          <LayoutEvent04TabParking />
        </v-tabs-window-item>

        <v-tabs-window-item :value="EVENT_FEATURE_TYPE.FILES">
          <LayoutEvent04TabFiles />
        </v-tabs-window-item>
      </v-tabs-window>

      <UiBtnScrollToTop :scroll-container="`#${layoutMainContainerId}`" />
    </v-container>
  </v-main>
  <v-bottom-navigation
    v-if="smAndDown"
    v-model="currentTab"
    :active="smAndDown"
    color="primary"
  >
    <v-btn
      v-for="tab in tabs"
      :key="tab.id"
      :active="tab.id === currentTab"
      active-color="primary"
      :value="tab.id"
    >
      <v-icon>{{ tab.icon }}</v-icon>

      {{
        typeof tab.title === 'string'
          ? tab.title
          : showDefaultTranslationOrEmpty(tab.title)
      }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useDisplay } from 'vuetify';
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

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const layoutMainContainerId = 'layout-main-container';
const { smAndDown } = useDisplay();

const currentTab = ref();

const tabs = computed(() => {
  if (!currentEvent.value) return [];
  const items = [];

  items.push({
    id: 'overview',
    title: 'Overview',
    icon: 'mdi-bug',
    show: () => smAndDown.value,
  });

  const featureProgram = getEventFeatureIfExists(currentEvent.value, 'PROGRAM');
  if (featureProgram) {
    items.push({
      id: EVENT_FEATURE_TYPE.PROGRAM,
      title: featureProgram.title,
      icon: featureProgram.icon,
      show: () => hasEventFeature(currentEvent.value!, 'PROGRAM'),
    });
  }

  const featureSchedule = getEventFeatureIfExists(
    currentEvent.value,
    'SCHEDULE',
  );
  if (featureSchedule) {
    items.push({
      id: EVENT_FEATURE_TYPE.SCHEDULE,
      title: featureSchedule.title,
      icon: featureSchedule.icon,
      show: () => hasEventFeature(currentEvent.value!, 'SCHEDULE'),
    });
  }

  const featureGuestList = getEventFeatureIfExists(
    currentEvent.value,
    'GUEST_LIST',
  );
  if (featureGuestList) {
    items.push({
      id: EVENT_FEATURE_TYPE.GUEST_LIST,
      title: featureGuestList.title,
      icon: featureGuestList.icon,
      show: () => hasEventFeature(currentEvent.value!, 'GUEST_LIST'),
    });
  }

  const featureParking = getEventFeatureIfExists(currentEvent.value, 'PARKING');
  if (featureParking) {
    items.push({
      id: EVENT_FEATURE_TYPE.PARKING,
      title: featureParking.title,
      icon: featureParking.icon,
      show: () => hasEventFeature(currentEvent.value!, 'PARKING'),
    });
  }

  const featureFiles = getEventFeatureIfExists(currentEvent.value, 'FILES');
  if (featureFiles) {
    items.push({
      id: EVENT_FEATURE_TYPE.FILES,
      title: featureFiles.title,
      icon: featureFiles.icon,
      show: () => hasEventFeature(currentEvent.value!, 'FILES'),
    });
  }

  return items.filter((i) => (i.show ? i.show() : true));
});

watch(
  () => smAndDown.value,
  (newValue) => {
    if (newValue && !currentTab.value) {
      currentTab.value = 'overview';
    } else if (!newValue && currentTab.value === 'overview') {
      currentTab.value = tabs.value[0].id;
    }
  },
  { immediate: true },
);
</script>
