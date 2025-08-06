<template>
  <div
    v-if="currentEvent && hasEventFeature(currentEvent, 'INFORMATIONS')"
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'INFORMATIONS')?.id}`"
  >
    <v-container class="pa-0 pa-sm-3" fluid>
      <v-expansion-panels
        v-model="currentCategoryFilter"
        flat
        :ripple="false"
        static
      >
        <v-expansion-panel
          v-for="category in categoriesSorted"
          :key="category.id"
          :value="category.id"
        >
          <template #title>
            <v-icon v-if="category.icon" :color="category.color" start>
              {{ category.icon }}
            </v-icon>
            {{ showDefaultTranslationOrEmpty(category.title) }}
          </template>
          <template #text>
            <v-row>
              <v-col
                v-for="information in itemsSorted"
                :key="information.id"
                cols="12"
              >
                <v-card class="mx-0" variant="flat">
                  <v-card-title class="px-0 text-wrap">
                    {{ showDefaultTranslationOrEmpty(information.title) }}
                  </v-card-title>
                  <v-card-text class="px-0">
                    <UiHtmlRender
                      :content="
                        showDefaultTranslationOrEmpty(information.content)
                      "
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import {
  getEventFeatureIfExists,
  hasEventFeature,
} from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { UiHtmlRender } from '@lib/ui';
import useEventInformations from '@/composables/event-informations.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
const { itemsSorted, currentCategoryFilter, categoriesSorted } =
  useEventInformations();
</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-title) {
  padding: 16px 8px;
}
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 8px 16px;
}
</style>
