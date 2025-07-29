<template>
  <div
    v-if="currentEvent && hasEventFeature(currentEvent, 'INFORMATIONS')"
    :id="`feature-${getEventFeatureIfExists(currentEvent, 'INFORMATIONS')?.id}`"
  >
    <v-container class="pa-0 pa-sm-3" fluid>
      <v-row dense>
        <v-col>
          <v-chip-group
            v-if="categories.length > 0"
            v-model="currentCategoryFilter"
            class="categories-chip-group"
            color="primary"
            mandatory
            mobile
          >
            <v-chip
              v-for="category in categories"
              :key="category.id"
              centered
              density="comfortable"
              filter
              :prepend-icon="category.icon"
              :text="showDefaultTranslationOrEmpty(category.title)"
              :value="category.id"
              variant="outlined"
            />
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col v-for="information in items" :key="information.id" cols="12">
          <v-card
            class="mx-0"
            :title="showDefaultTranslationOrEmpty(information.title)"
            variant="flat"
          >
            <template #text>
              <UiHtmlRender
                :content="showDefaultTranslationOrEmpty(information.content)"
              />
            </template>
          </v-card>
        </v-col>
      </v-row>
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
const { items, currentCategoryFilter, categories } = useEventInformations();
</script>
