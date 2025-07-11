<template>
  <v-container
    v-if="currentEvent"
    :id="layoutMainContainerId"
    class="mobile-container"
    fluid
  >
    <div v-if="currentTab === 'OVERVIEW'">
      <LayoutEvent04MobileTabHero />
    </div>

    <div v-if="currentTab === EVENT_FEATURE_TYPE.PROGRAM">
      <LayoutEvent04MobileTabProgram />
    </div>

    <div v-if="currentTab === EVENT_FEATURE_TYPE.PARKING">
      <LayoutEvent04MobileTabParking />
    </div>

    <div v-if="currentTab === EVENT_FEATURE_TYPE.SCHEDULE">
      <LayoutEvent04MobileTabSchedule />
    </div>

    <div v-if="currentTab === EVENT_FEATURE_TYPE.FILES">
      <LayoutEvent04MobileTabFiles />
    </div>

    <div v-if="currentTab === 'MORE'" class="fill-height">
      <div v-if="currentMoreTab">
        <v-btn icon="mdi-arrow-left" @click="currentMoreTab = undefined" />

        <div v-if="currentMoreTab === EVENT_FEATURE_TYPE.PROGRAM">
          <LayoutEvent04MobileTabProgram />
        </div>

        <div v-if="currentMoreTab === EVENT_FEATURE_TYPE.PARKING">
          <LayoutEvent04MobileTabParking />
        </div>

        <div v-if="currentMoreTab === EVENT_FEATURE_TYPE.SCHEDULE">
          <LayoutEvent04MobileTabSchedule />
        </div>

        <div v-if="currentMoreTab === EVENT_FEATURE_TYPE.FILES">
          <LayoutEvent04MobileTabFiles />
        </div>

        <div v-if="currentMoreTab === EVENT_FEATURE_TYPE.CONTACTS">
          <LayoutEvent04MobileTabContacts />
        </div>
      </div>

      <div v-else class="fill-height">
        <LayoutEvent04MobileTitle
          class="d-flex justify-space-between"
          :title="t('labels.more')"
        >
          <template #append>
            <TheAppMenuLanguage />
          </template>
        </LayoutEvent04MobileTitle>

        <div class="d-flex flex-column justify-space-between fill-height">
          <v-list base-color="primary" rounded="lg" variant="outlined">
            <v-list-item
              v-for="item in tabsItemsMore"
              :key="item.id"
              append-icon="mdi-arrow-right"
              class="my-2"
              :prepend-icon="item.icon"
              rounded="lg"
              slim
              :title="
                typeof item.title === 'string'
                  ? item.title
                  : showDefaultTranslationOrEmpty(item.title)
              "
              @click="currentMoreTab = item.id"
            ></v-list-item>
          </v-list>
        </div>
      </div>
    </div>

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
      :active="'MORE' === currentTab"
      active-color="primary"
      value="MORE"
      @click="currentMoreTab = undefined"
    >
      <v-icon>mdi-dots-horizontal</v-icon>

      {{ t('labels.more') }}
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
import LayoutEvent04MobileTabProgram from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTabProgram.vue';
import LayoutEvent04MobileTabSchedule from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTabSchedule.vue';
import LayoutEvent04MobileTabParking from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTabParking.vue';
import LayoutEvent04MobileTabFiles from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTabFiles.vue';
import LayoutEvent04MobileTabHero from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTabHero.vue';
import { useI18n } from 'vue-i18n';
import LayoutEvent04MobileTitle from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTitle.vue';
import LayoutEvent04MobileTabContacts from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTabContacts.vue';
import TheAppMenuLanguage from '@/components/TheAppMenuLanguage.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const layoutMainContainerId = 'layout-main-container';
const { smAndDown } = useDisplay();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const currentTab = ref();
const currentMoreTab = ref();

const tabs = computed(() => {
  if (!currentEvent.value) return [];
  const items = [];

  items.push({
    id: 'OVERVIEW',
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

  const featureContacts = getEventFeatureIfExists(
    currentEvent.value,
    'CONTACTS',
  );
  if (featureContacts) {
    items.push({
      id: EVENT_FEATURE_TYPE.CONTACTS,
      title: featureContacts.title || t('labels.features.CONTACTS'),
      icon: featureContacts.icon,
      show: () => hasEventFeature(currentEvent.value!, 'CONTACTS'),
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
      currentTab.value = 'OVERVIEW';
    } else if (!newValue && currentTab.value === 'OVERVIEW') {
      currentTab.value = tabs.value[0].id;
    }
  },
  { immediate: true },
);

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

<style scoped lang="scss">
.mobile-container {
  height: calc(100% - 56px);
}
</style>
