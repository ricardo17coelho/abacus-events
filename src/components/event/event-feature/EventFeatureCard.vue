<template>
  <UiForwardSlots :slots="$slots">
    <v-card
      v-if="feature"
      color="primary"
      :density="xs ? 'compact' : 'default'"
      height="100%"
      variant="tonal"
    >
      <template v-if="feature.icon" #prepend>
        <slot :feature="feature" name="prepend">
          <v-avatar rounded="0" size="36">
            <v-icon color="primary">
              {{ feature.icon }}
            </v-icon>
          </v-avatar>
        </slot>
      </template>
      <template v-if="feature.title" #title>
        <span class="text-h6 text-sm-h5">
          {{ showDefaultTranslationOrEmpty(feature.title) }}
          <AppLiveLabel v-if="feature.feature_id === 'PARKING'" />
        </span>
      </template>
      <template v-if="feature.description" #subtitle>
        <span class="text-wrap">
          {{ showDefaultTranslationOrEmpty(feature.description) }}
        </span>
      </template>
    </v-card>
  </UiForwardSlots>
</template>

<script setup lang="ts">
import AppLiveLabel from '@/components/app/AppLiveLabel.vue';
import type { EventFeature } from '@/api/types/EventFeature.ts';
import { useDisplay } from 'vuetify';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { UiForwardSlots } from '@lib/ui/components';

defineProps({
  feature: {
    type: Object as PropType<EventFeature>,
    default: undefined,
  },
});

const { xs } = useDisplay();
</script>
