<template>
  <v-container class="align-center">
    <v-row>
      <v-col v-for="event in events" :key="event.id" cols="12" lg="3" sm="6">
        <v-card
          :density="xs ? 'compact' : 'default'"
          height="100%"
          :to="{
            name: 'event',
            params: { eventId: event.slug || event.id },
          }"
        >
          <v-img
            class="ma-4"
            color="surface-light"
            cover
            height="240"
            rounded="lg"
            :src="event.brand?.logo"
          />

          <v-card-title v-if="event.title" class="text-body-1 text-sm-h6">
            {{ showDefaultTranslationOrEmpty(event.title) }}
          </v-card-title>

          <v-card-subtitle v-if="event.title" class="text-wrap">
            {{ showDefaultTranslationOrEmpty(event.description) }}
          </v-card-subtitle>

          <v-chip v-if="event.date" class="ma-4" density="compact">
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
