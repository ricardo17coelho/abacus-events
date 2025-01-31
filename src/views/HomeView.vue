<template>
  <v-container class="align-center">
    <v-row>
      <v-col
        v-for="event in events"
        :key="event.id"
        cols="12"
        sm="6"
        lg="3"
      >
        <v-card
          height="100%"
          :density="xs ? 'compact' : 'default'"
          :to="{
            name: 'event',
            params: { eventId: event.slug || event.id }
          }"
        >
          <v-img
            class="ma-4"
            color="surface-light"
            cover
            height="240"
            rounded="lg"
            :src="event.banner"
          />

          <v-card-title
            v-if="event.name"
            class="text-body-1 text-sm-h6"
          >
            {{ showDefaultTranslationOrEmpty(event.name) }}
          </v-card-title>

          <v-card-subtitle
            v-if="event.name"
            class="text-wrap"
          >
            {{ showDefaultTranslationOrEmpty(event.description) }}
          </v-card-subtitle>

          <v-chip
            v-if="event.date"
            density="compact"
            class="ma-4"
          >
            {{ event.date }}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Event } from '@/api/types/Event.ts';
import { toast } from 'vue-sonner';
import useApiEvents from '@/api/events.ts';
import { useDisplay } from 'vuetify';
import { showDefaultTranslationOrEmpty } from '../utils/showDefaultTranslationOrEmpty.ts';

const { t } = useI18n();

const { xs } = useDisplay();

const events = ref<Event[]>([]);

const { getEvents } = useApiEvents();

const fetchData = async () => {
  const { data, error } = await getEvents();
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
