<template>
  <v-container
    v-if="currentEvent"
    :id="layoutMainContainerId"
    class="app-container"
  >
    <v-tabs-window v-model="currentTab">
      <v-tabs-window-item value="overview">
        <LayoutEvent04TabHero />
      </v-tabs-window-item>

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

      <v-tabs-window-item value="more">
        <v-tabs-window v-if="currentMoreTab" v-model="currentMoreTab">
          <v-btn @click="currentMoreTab = undefined">Back</v-btn>

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

        <v-container v-else fluid>
          <h4 class="text-h4">More</h4>
          <v-list base-color="primary" rounded="lg" variant="outlined">
            <v-list-item
              v-for="item in tabsItemsMore"
              :key="item.id"
              append-icon="mdi-arrow-right"
              class="my-2"
              :prepend-icon="item.icon"
              rounded="lg"
              :title="
                typeof item.title === 'string'
                  ? item.title
                  : showDefaultTranslationOrEmpty(item.title)
              "
              @click="currentMoreTab = item.id"
            ></v-list-item>
          </v-list>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>

    <UiBtnScrollToTop :scroll-container="`#${layoutMainContainerId}`" />
  </v-container>

  <v-bottom-navigation
    v-if="smAndDown"
    v-model="currentTab"
    :active="smAndDown"
    color="primary"
    grow
    mandatory
  >
    <v-btn
      v-for="tab in tabsItemsMain"
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

    <v-btn
      v-if="tabsItemsMore.length"
      :active="'more' === currentTab"
      active-color="primary"
      value="more"
      @click="currentMoreTab = undefined"
    >
      <v-icon>mdi-dots-horizontal</v-icon>

      More
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
import { useI18n } from 'vue-i18n';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const layoutMainContainerId = 'layout-main-container';
const { smAndDown } = useDisplay();
const { t } = useI18n();

const currentTab = ref();
const currentMoreTab = ref();

const tabs = computed(() => {
  if (!currentEvent.value) return [];
  const items = [];

  items.push({
    id: 'overview',
    title: 'Home',
    icon: 'mdi-home',
    show: () => smAndDown.value,
  });

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

const tabsItemsMain = computed(() => [...tabs.value].splice(0, 3));
const tabsItemsMore = computed(() =>
  [...tabs.value].splice(3, tabs.value.length - 3),
);

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
