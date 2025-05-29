<template>
  <div v-if="currentEvent">
    <v-alert
      v-for="alert in currentEvent.schedule_alerts"
      :key="alert.id"
      :icon="alert.icon"
      :text="showDefaultTranslationOrEmpty(alert.message)"
      :title="showDefaultTranslationOrEmpty(alert.title)"
      :type="alert.type"
      variant="tonal"
    >
    </v-alert>

    <v-row>
      <v-col
        v-for="schedule in currentEvent.schedule"
        :key="schedule.id"
        cols="12"
        md="auto"
        sm="6"
      >
        <v-card
          height="100%"
          :min-width="width > 350 ? 300 : '100%'"
          :subtitle="showDefaultTranslationOrEmpty(schedule.description)"
          width="100%"
        >
          <template #title>
            <v-icon color="primary" size="x-small">
              {{ schedule.icon }}
            </v-icon>
            {{ showDefaultTranslationOrEmpty(schedule.title) }}
          </template>
          <v-card-item>
            <EventScheduleItemTimeline
              v-if="schedule.items"
              :items="schedule.items"
            >
            </EventScheduleItemTimeline>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import EventScheduleItemTimeline from '@/components/event/event-schedule/event-schedule-items/EventScheduleItemTimeline.vue';
import { useDisplay } from 'vuetify/framework';

const { width } = useDisplay();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
