<template>
  <v-container
    v-if="currentEvent"
    :id="layoutMainContainerId"
    class="app-container"
  >
    <!-- HERO SECTION -->
    <LayoutEvent04DesktopTabHero />

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
        <LayoutEvent04DesktopTabProgram />
      </v-tabs-window-item>

      <v-tabs-window-item :value="EVENT_FEATURE_TYPE.PARKING">
        <LayoutEvent04DesktopTabParking />
      </v-tabs-window-item>

      <v-tabs-window-item :value="EVENT_FEATURE_TYPE.SCHEDULE">
        <LayoutEvent04DesktopTabSchedule />
      </v-tabs-window-item>

      <v-tabs-window-item :value="EVENT_FEATURE_TYPE.INFORMATIONS">
        <LayoutEvent04DesktopTabInformations />
      </v-tabs-window-item>

      <v-tabs-window-item :value="EVENT_FEATURE_TYPE.FILES">
        <LayoutEvent04DesktopTabFiles />
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
import LayoutEvent04DesktopTabProgram from '@/layouts/event/LayoutEvent04/desktop/LayoutEvent04DesktopTabProgram.vue';
import LayoutEvent04DesktopTabSchedule from '@/layouts/event/LayoutEvent04/desktop/LayoutEvent04DesktopTabSchedule.vue';
import LayoutEvent04DesktopTabParking from '@/layouts/event/LayoutEvent04/desktop/LayoutEvent04DesktopTabParking.vue';
import LayoutEvent04DesktopTabFiles from '@/layouts/event/LayoutEvent04/desktop/LayoutEvent04DesktopTabFiles.vue';
import LayoutEvent04DesktopTabHero from '@/layouts/event/LayoutEvent04/desktop/LayoutEvent04DesktopTabHero.vue';
import { useI18n } from 'vue-i18n';
import LayoutEvent04DesktopTabInformations from '@/layouts/event/LayoutEvent04/desktop/LayoutEvent04DesktopTabInformations.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const layoutMainContainerId = 'layout-main-container';
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

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

  const featureInformations = getEventFeatureIfExists(
    currentEvent.value,
    'INFORMATIONS',
  );
  if (featureInformations) {
    items.push({
      id: EVENT_FEATURE_TYPE.INFORMATIONS,
      title: featureInformations.title || t('labels.features.INFORMATIONS'),
      icon: featureInformations.icon,
      show: () => hasEventFeature(currentEvent.value!, 'INFORMATIONS'),
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

function updateRouteHash(tabId: string) {
  if (route.hash !== `#${tabId}`) {
    router.replace({ hash: `#${tabId}` });
  }
}

// Sync tab selection with the URL hash
onMounted(() => {
  const hashTab = route.hash.replace('#', '');
  if (tabs.value.map((t) => t.id).includes(hashTab)) {
    currentTab.value = hashTab;
  }
  if (currentTab.value) {
    updateRouteHash(currentTab.value);
  }
});

// Update the hash when the tab changes
watch(currentTab, (newTab) => {
  updateRouteHash(newTab);
});
</script>
