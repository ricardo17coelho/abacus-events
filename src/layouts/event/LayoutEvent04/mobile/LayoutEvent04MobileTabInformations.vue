<template>
  <v-container
    v-if="currentEvent && feature && currentEvent.files.length"
    class="px-0"
  >
    <LayoutEvent04MobileTitle
      class="d-flex align-center justify-space-between"
      :prepend-icon="feature.icon"
      :title="
        showDefaultTranslationOrEmpty(feature.title) ??
        t(`labels.features.${feature.feature_id}`)
      "
    >
      <template #append>
        <v-btn-toggle
          v-model="currentView"
          base-color="surface-light"
          class="bg-surface-light pa-1"
          color="black"
          density="compact"
        >
          <v-btn
            class="text-none flex-1-1-0"
            icon="mdi-list-box"
            value="panels"
          />

          <v-btn
            class="text-none flex-1-1-0"
            icon="mdi-list-box"
            value="chips"
          />
        </v-btn-toggle>
      </template>
    </LayoutEvent04MobileTitle>

    <LayoutEvent04SharedTabInformations v-if="currentView === 'chips'" />
    <LayoutEvent04MobileTabInformationsPanels
      v-else-if="currentView === 'panels'"
    />
  </v-container>
</template>

<script setup lang="ts">
import { getEventFeatureIfExists } from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import LayoutEvent04MobileTitle from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTitle.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { useI18n } from 'vue-i18n';
import LayoutEvent04SharedTabInformations from '@/layouts/event/LayoutEvent04/shared/LayoutEvent04SharedTabInformations.vue';
import LayoutEvent04MobileTabInformationsPanels from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTabInformationsPanels.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { t } = useI18n();

const feature = computed(() =>
  currentEvent.value
    ? getEventFeatureIfExists(currentEvent.value, 'INFORMATIONS')
    : undefined,
);

const currentView = ref<'chips' | 'panels'>('chips');
</script>
