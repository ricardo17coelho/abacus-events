<template>
  <Page v-if="currentEvent">
    <PageHeading :title="showDefaultTranslationOrEmpty(currentEvent.title)" />
    <PageContent>
      <v-toolbar color="white" density="compact">
        <v-tabs
          align-tabs="end"
          color="primary"
          density="compact"
          :model-value="activeTab"
        >
          <v-tab
            v-for="item in tabs"
            :key="item.value"
            exact
            :to="item.to"
            :value="item.value"
          >
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-container class="pa-0" fluid>
        <router-view />
      </v-container>
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { hasEventFeature } from '@/utils/event-features.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const route = useRoute();

// Determine the active tab based on the current route
const activeTab = computed(() => {
  const matchRouteName = route.name; // Capture the route name
  if (typeof matchRouteName === 'string') {
    // Ensure matchRouteName is a string before using startsWith
    const matchingTab = tabs.value.find((tab) =>
      matchRouteName.startsWith(tab.matchRouteName),
    );
    return matchingTab ? matchingTab.value : null;
  }
  return null;
});

const tabs = computed(() =>
  [
    {
      value: 'manage-events-id-settings',
      text: 'Settings',
      to: {
        name: 'manage-events-id-settings',
      },
      matchRouteName: 'manage-events-id-settings',
    },
    {
      value: 'manage-events-id-brand',
      text: 'Brand',
      to: {
        name: 'manage-events-id-brand',
      },
      matchRouteName: 'manage-events-id-brand',
    },
    {
      value: 'manage-events-id-users',
      text: 'Users',
      to: {
        name: 'manage-events-id-users',
      },
      matchRouteName: 'manage-events-id-users',
    },
    {
      value: 'manage-events-id-guest-list',
      text: 'Guest List',
      to: {
        name: 'manage-events-id-guest-list',
      },
      matchRouteName: 'manage-events-id-guest-list',
      show: () =>
        currentEvent.value && hasEventFeature(currentEvent.value, 'GUEST_LIST'),
    },
    {
      value: 'manage-events-id-contacts',
      text: 'Contacts',
      to: {
        name: 'manage-events-id-contacts',
      },
      matchRouteName: 'manage-events-id-contacts',
      show: () =>
        currentEvent.value && hasEventFeature(currentEvent.value, 'CONTACTS'),
    },
    {
      value: 'manage-events-id-parking-lots',
      text: 'Parking Lots',
      to: {
        name: 'manage-events-id-parking-lots',
      },
      matchRouteName: 'manage-events-id-parking-lots',
      show: () =>
        currentEvent.value && hasEventFeature(currentEvent.value, 'PARKING'),
    },
    {
      value: 'manage-events-id-shuttle-plan',
      text: 'Shuttle Bus',
      to: {
        name: 'manage-events-id-shuttle-plan',
      },
      matchRouteName: 'manage-events-id-shuttle-plan',
      show: () =>
        currentEvent.value &&
        hasEventFeature(currentEvent.value, 'SHUTTLE_PLAN'),
    },
  ].filter((i) => (i.show ? i.show() : true)),
);
</script>
