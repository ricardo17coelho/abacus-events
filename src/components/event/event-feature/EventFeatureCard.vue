<template>
  <v-card
    v-if="feature"
    color="primary"
    :density="xs ? 'compact' : 'default'"
    height="100%"
    variant="tonal"
  >
    <template v-if="feature.title" #title>
      <v-card-title class="text-h6 text-sm-h5">
        {{ showDefaultTranslationOrEmpty(feature.title) }}
        <AppLiveLabel v-if="feature.feature_id === 'PARKING'" />
      </v-card-title>
    </template>
    <template v-if="feature.description" #subtitle>
      <v-card-subtitle class="text-wrap">
        {{ showDefaultTranslationOrEmpty(feature.description) }}
      </v-card-subtitle>
    </template>
    <template v-if="feature.icon" #append>
      <v-avatar rounded="0" size="40">
        <v-icon color="primary" size="40">
          {{ feature.icon }}
        </v-icon>
      </v-avatar>
    </template>

    <!--
      Dynamically inherit slots from parent
      & make all slots from component reusable from parent
    -->
    <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData" />
    </template>
  </v-card>
</template>

<script setup lang="ts">
import AppLiveLabel from '@/components/app/AppLiveLabel.vue';
import type { EventFeature } from '@/api/types/EventFeature.ts';
import { useDisplay } from 'vuetify';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';

defineProps({
  feature: {
    type: Object as PropType<EventFeature>,
    default: undefined,
  },
});

const { xs } = useDisplay();
</script>
