<template>
  <v-card
    v-if="event"
    :density="xs ? 'compact' : 'default'"
    height="100%"
    :to="{
      name: 'event',
      params: { eventId: event.slug || event.id },
    }"
  >
    <v-img class="align-start pa-3" cover height="250" :src="event.brand?.logo">
      <div v-if="showCountdown" class="d-flex justify-end ga-1">
        <v-chip v-if="event.date" class="px-3" color="white" density="compact">
          <CountdownDate :date="event.date" />
        </v-chip>
      </div>
    </v-img>

    <v-card-title v-if="event.title" class="text-body-1 text-sm-h6">
      {{ showDefaultTranslationOrEmpty(event.title) }}
    </v-card-title>

    <v-card-subtitle v-if="event.title" class="text-wrap">
      {{ showDefaultTranslationOrEmpty(event.description) }}
    </v-card-subtitle>

    <div class="d-flex justify-space-between ma-4">
      <v-chip v-if="event.date" density="compact">
        {{ formatDateByFormat(event.date) }}
      </v-chip>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { formatDateByFormat } from '@lib/ui';
import { useDisplay } from 'vuetify/framework';
import type { Event } from '@/api/types/Event.ts';
import CountdownDate from '@/components/CountdownDate.vue';

defineProps({
  event: {
    type: Object as PropType<Event>,
    default: undefined,
  },
  showCountdown: {
    type: Boolean,
    default: false,
  },
});

const { xs } = useDisplay();
</script>
