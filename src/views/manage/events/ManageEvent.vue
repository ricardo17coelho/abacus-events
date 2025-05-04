<template>
  <Page v-if="currentEvent">
    <PageHeading
      :caption="formatDateByFormat(currentEvent.date)"
      :subtitle="showDefaultTranslationOrEmpty(currentEvent.subtitle)"
      :title="showDefaultTranslationOrEmpty(currentEvent.title)"
    >
      <template #actions>
        <DialogEventLayoutView>
          <template #activator="{ props: activatorProps }">
            <VBtnPrimary
              v-bind="activatorProps"
              icon="mdi-eye"
              variant="text"
            />
          </template>
        </DialogEventLayoutView>
        <EventDialog
          v-if="isUserAdmin"
          :event-id="currentEvent.id"
          @success="onEventSave"
        >
          <template #activator="{ props: activatorProps }">
            <VBtnPrimary
              v-bind="activatorProps"
              icon="mdi-pencil"
              variant="text"
            />
          </template>
        </EventDialog>
      </template>
    </PageHeading>
    <PageContent class="px-sm-0">
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

      <router-view />
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { hasEventFeature } from '@/utils/event-features.ts';
import EventDialog from '@/components/event/event/EventDialog.vue';
import useAuthUser from '@/composables/auth-user.ts';
import { useI18n } from 'vue-i18n';
import DialogEventLayoutView from '@/components/dialogs/DialogEventLayoutView.vue';
import { formatDateByFormat } from '@lib/ui';
import type { Event } from '@/api/types/Event.ts';
import { toast } from 'vue-sonner';
import useApiEvents from '@/api/events.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const route = useRoute();
const { t } = useI18n();

const { isUserAdmin } = useAuthUser();

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
      text: t('labels.settings'),
      to: {
        name: 'manage-events-id-settings',
      },
      matchRouteName: 'manage-events-id-settings',
    },
    {
      value: 'manage-events-id-brand',
      text: t('labels.brand'),
      to: {
        name: 'manage-events-id-brand',
      },
      matchRouteName: 'manage-events-id-brand',
    },
    {
      value: 'manage-events-id-persons',
      text: t('labels.persons'),
      to: {
        name: 'manage-events-id-persons',
      },
      matchRouteName: 'manage-events-id-persons',
    },
    // {
    //   value: 'manage-events-id-users',
    //   text: t('labels.users'),
    //   to: {
    //     name: 'manage-events-id-users',
    //   },
    //   matchRouteName: 'manage-events-id-users',
    // },
    // Features
    {
      value: 'manage-events-id-contacts',
      text: t('labels.features.CONTACTS'),
      to: {
        name: 'manage-events-id-contacts',
      },
      matchRouteName: 'manage-events-id-contacts',
      show: () =>
        currentEvent.value && hasEventFeature(currentEvent.value, 'CONTACTS'),
    },
    {
      value: 'manage-events-id-files',
      text: t('labels.features.FILES'),
      to: {
        name: 'manage-events-id-files',
      },
      matchRouteName: 'manage-events-id-files',
      show: () =>
        currentEvent.value && hasEventFeature(currentEvent.value, 'FILES'),
    },
    {
      value: 'manage-events-id-guest-list',
      text: t('labels.features.GUEST_LIST'),
      to: {
        name: 'manage-events-id-guest-list',
      },
      matchRouteName: 'manage-events-id-guest-list',
      show: () =>
        currentEvent.value && hasEventFeature(currentEvent.value, 'GUEST_LIST'),
    },
    {
      value: 'manage-events-id-parking-lots',
      text: t('labels.features.PARKING'),
      to: {
        name: 'manage-events-id-parking-lots',
      },
      matchRouteName: 'manage-events-id-parking-lots',
      show: () =>
        currentEvent.value && hasEventFeature(currentEvent.value, 'PARKING'),
    },
    {
      value: 'manage-events-id-program',
      text: t('labels.features.PROGRAM'),
      to: {
        name: 'manage-events-id-program',
      },
      matchRouteName: 'manage-events-id-program',
      show: () =>
        currentEvent.value && hasEventFeature(currentEvent.value, 'PROGRAM'),
    },
    {
      value: 'manage-events-id-shuttle-plan',
      text: t('labels.features.SHUTTLE_PLAN'),
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

const { getEventByIdOrSlug } = useApiEvents();
async function onEventSave(payload: Event) {
  const { data, error } = await getEventByIdOrSlug(payload.id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    currentEvent.value = data;
  }
}
</script>
