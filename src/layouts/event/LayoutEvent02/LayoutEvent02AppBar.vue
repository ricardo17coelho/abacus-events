<template>
  <v-app-bar class="px-1" flat>
    <v-container class="d-flex align-center py-0 app-container">
      <router-link to="/">
        <v-img max-width="200" src="/logos/abacus.svg" width="150" />
      </router-link>
      <v-spacer />
      <div
        class="d-flex"
        :class="{
          'ga-1': xs,
          'ga-5': smAndUp,
        }"
      >
        <UiMenu
          v-if="xs"
          :items="currentEventFeaturesFormatted"
          show-activator
        ></UiMenu>
        <template v-else>
          <VBtnPrimary
            v-for="feature in currentEventFeaturesFormatted"
            :key="feature.id"
            @click="feature.action ? feature.action() : undefined"
          >
            {{ feature.title }}
          </VBtnPrimary>
        </template>
      </div>
      <TheAppMenuLanguage />
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay, useGoTo } from 'vuetify';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { EVENT_FEATURE_TYPE } from '@/api/types/EventFeature.ts';
import { type MenuItem, UiMenu } from '@lib/ui';
import TheAppMenuLanguage from '@/components/TheAppMenuLanguage.vue';

const props = defineProps({
  scrollContainer: {
    type: String,
    default: undefined,
  },
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const goTo = useGoTo();
const { xs, smAndUp } = useDisplay();

const currentEventFeaturesFormatted = computed<MenuItem[]>(() =>
  currentEvent.value?.features
    .filter((i) =>
      [EVENT_FEATURE_TYPE.GUEST_LIST, EVENT_FEATURE_TYPE.PROGRAM].includes(
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
          goTo(target, { container: props.scrollContainer });
        },
      };
    }),
);
</script>
