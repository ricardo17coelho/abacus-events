<template>
  <v-card class="mx-auto" max-width="650" title="Events">
    <template #append>
      <v-btn icon="mdi-eye" :to="{ name: 'manage-events' }"></v-btn>
    </template>
    <v-divider />

    <v-list lines="two">
      <template v-for="(event, i) in events" :key="event.id">
        <v-divider v-if="i !== 0" />

        <v-list-item link>
          <template #prepend>
            <v-avatar color="surface-light" size="64" tile> #TODO </v-avatar>
          </template>

          <v-list-item-subtitle class="text-caption mb-2">
            {{ showDefaultTranslationOrEmpty(event.title) }}
          </v-list-item-subtitle>

          <v-list-item-title class="text-subtitle-2 font-weight-bold">
            {{ showDefaultTranslationOrEmpty(event.description) }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { Event } from '@/api/types/Event.ts';
import useApiEvents from '@/api/events.ts';
import { toast } from 'vue-sonner';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
