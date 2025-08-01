<template>
  <v-container>
    <AppTitle>Upcoming events</AppTitle>
    <v-row>
      <v-col
        v-for="event in upcomingEvents"
        :key="event.id"
        cols="12"
        lg="3"
        sm="6"
      >
        <EventCard
          :event="event"
          height="100%"
          show-countdown
          :to="{
            name: 'event',
            params: { eventId: event.slug || event.id },
          }"
        />
      </v-col>
    </v-row>

    <v-row v-if="pastEvents.length">
      <v-expansion-panels flat>
        <v-expansion-panel title="Past Events">
          <template #text>
            <v-container>
              <v-row>
                <v-col
                  v-for="event in pastEvents"
                  :key="event.id"
                  cols="12"
                  lg="3"
                  sm="6"
                >
                  <EventCard
                    :event="event"
                    height="100%"
                    :to="{
                      name: 'event',
                      params: { eventId: event.slug || event.id },
                    }"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Event } from '@/api/types/Event.ts';
import { toast } from 'vue-sonner';
import useApiEvents from '@/api/events.ts';
import EventCard from '@/components/event/EventCard.vue';
import AppTitle from '@/components/app/AppTitle.vue';

const { t } = useI18n();

const events = ref<Event[]>([]);

// Get the current date/time
const now = new Date();

// Computed for upcoming events
const upcomingEvents = computed(() =>
  events.value.filter((event) => new Date(event.date) > now),
);

// Computed for past events
const pastEvents = computed(() =>
  events.value.filter((event) => new Date(event.date) <= now),
);

const { getEventsPublic } = useApiEvents();

const fetchData = async () => {
  const { data, error } = await getEventsPublic();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    events.value = data;
  }
};
fetchData();
</script>
