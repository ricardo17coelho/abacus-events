<template>
  <v-container
    v-if="currentEvent"
    class="d-flex justify-center flex-column ga-10 ma-0"
    fluid
  >
    <VCardSettings title="Features">
      <template #append>
        <EventFeatureDialog @success="onSave">
          <template #activator="{ props: activatorProps }">
            <VBtnPrimary v-bind="activatorProps">
              {{ t('actions.add') }}
            </VBtnPrimary>
          </template>
        </EventFeatureDialog>
      </template>

      <v-card-text>
        <v-row>
          <v-col
            v-for="feature in currentEvent.features"
            :key="feature.id"
            cols="12"
            lg="auto"
            md="4"
            sm="6"
          >
            <v-card height="100%" max-width="300">
              <v-card-item>
                <EventFeatureCard :feature="feature"> </EventFeatureCard>
              </v-card-item>
              <v-card-actions>
                <v-spacer />
                <UiMenu
                  :context="feature"
                  :items="featureMenuItems"
                  show-activator
                ></UiMenu>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <EventFeatureDialog
        :event-feature-id="currentEventFeatureId"
        :model-value="currentEventFeatureId !== undefined"
        @success="onSave"
        @update:model-value="currentEventFeatureId = undefined"
      />
    </VCardSettings>
  </v-container>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import EventFeatureDialog from '@/components/event/event-feature/EventFeatureDialog.vue';
import { useI18n } from 'vue-i18n';
import EventFeatureCard from '@/components/event/event-feature/EventFeatureCard.vue';
import { type MenuItem, UiMenu } from '@lib/ui';
import type { EventFeature } from '@/api/types/EventFeature.ts';
import useApiEventFeature from '@/api/event-feature.ts';
import { toast } from 'vue-sonner';

const { t } = useI18n();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

function onSave(payload: EventFeature) {
  if (!currentEvent.value) return;

  const idx = currentEvent.value.features.findIndex((i) => i.id === payload.id);

  if (idx > -1) {
    Object.assign(currentEvent.value?.features[idx], payload);
  } else {
    currentEvent.value?.features.push(payload);
  }
}

const currentEventFeatureId = ref();

const { removeEventFeature } = useApiEventFeature();

async function onDeleteFeature(item: EventFeature) {
  if (!currentEvent.value) return;
  const { error } = await removeEventFeature(item.id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  // Find the index of the item to remove
  const idx = currentEvent.value.features.findIndex((i) => i.id === item.id);
  if (idx > -1) {
    // Use splice to remove the item from the array
    currentEvent.value.features.splice(idx, 1);
  }
}

const featureMenuItems = computed<MenuItem[]>(() => [
  {
    key: 'edit',
    title: t('actions.edit'),
    prepend: {
      icon: {
        icon: 'mdi-pencil',
      },
    },
    action: (item: EventFeature) => {
      currentEventFeatureId.value = item.id;
    },
  },
  {
    key: 'delete',
    title: t('actions.delete'),
    prepend: {
      icon: {
        icon: 'mdi-delete',
        color: 'error',
      },
    },
    action: (item: EventFeature) => onDeleteFeature(item),
  },
]);
</script>
