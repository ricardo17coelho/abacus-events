<template>
  <v-container
    v-if="currentEvent && feature && currentEvent.files.length"
    class="px-0"
  >
    <LayoutEvent04MobileTitle
      :prepend-icon="feature.icon"
      :title="
        showDefaultTranslationOrEmpty(feature.title) ??
        t(`labels.features.${feature.feature_id}`)
      "
    />

    <LayoutEvent04SharedTabProgram />
  </v-container>
</template>

<script setup lang="ts">
import { getEventFeatureIfExists } from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import LayoutEvent04SharedTabProgram from '@/layouts/event/LayoutEvent04/shared/LayoutEvent04SharedTabProgram.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import LayoutEvent04MobileTitle from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTitle.vue';
import { useI18n } from 'vue-i18n';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { t } = useI18n();

const feature = computed(() =>
  currentEvent.value
    ? getEventFeatureIfExists(currentEvent.value, 'PROGRAM')
    : undefined,
);
</script>
