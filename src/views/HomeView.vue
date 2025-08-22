<template>
  <Page>
    <PageHeading title="Upcoming events" />

    <PageContent>
      <v-row>
        <v-col
          v-for="event in upcomingEvents"
          :key="event.id"
          cols="12"
          lg="4"
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

      <v-expansion-panels v-if="pastEvents.length" flat>
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
    </PageContent>
  </Page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Event } from '@/api/types/Event.ts';
import { toast } from 'vue-sonner';
import useApiEvents from '@/api/events.ts';
import EventCard from '@/components/event/EventCard.vue';
import { Page, PageContent, PageHeading } from '@/components/page';

const { t } = useI18n();

const events = ref<Event[]>([]);

const stripTime = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const today = stripTime(new Date());

const upcomingEvents = computed<Event[]>(() =>
  events.value.filter((event) => stripTime(new Date(event.date)) >= today),
);

const pastEvents = computed<Event[]>(() =>
  events.value.filter((event) => stripTime(new Date(event.date)) < today),
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
