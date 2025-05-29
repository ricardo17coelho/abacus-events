<template>
  <UiForwardSlots :slots="$slots">
    <v-card
      v-if="feature"
      :density="xs ? 'compact' : 'default'"
      height="100%"
      variant="flat"
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
      <template #title>
        <div class="text-h6 text-sm-h5">
          <span v-if="feature.title">
            {{ showDefaultTranslationOrEmpty(feature.title) }}
          </span>
          <span v-else>
            {{ t(`labels.features.${feature.feature_id}`) }}
          </span>
        </div>
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
import type { EventFeature } from '@/api/types/EventFeature.ts';
import { useDisplay } from 'vuetify';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { UiForwardSlots } from '@lib/ui/components';
import { useI18n } from 'vue-i18n';

defineProps({
  feature: {
    type: Object as PropType<EventFeature>,
    default: undefined,
  },
});

const { xs } = useDisplay();
const { t } = useI18n();
</script>
