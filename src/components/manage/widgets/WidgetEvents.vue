<template>
  <v-card class="mx-auto" title="Events">
    <template #append>
      <v-btn icon="mdi-eye" :to="{ name: 'manage-events' }"></v-btn>
    </template>
    <v-divider />

    <v-list lines="two">
      <template v-for="(event, i) in events" :key="event.id">
        <v-divider v-if="i !== 0" />

        <v-list-item
          link
          :to="{
            name: 'manage-events-id',
            params: { eventId: event.slug || event.id },
          }"
        >
          <template #prepend>
            <v-avatar color="surface-light" size="64" tile>
              <v-img color="surface-light" cover :src="event.brand?.logo" />
            </v-avatar>
          </template>

          <v-list-item-title class="font-weight-bold">
            {{ showDefaultTranslationOrEmpty(event.title) }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ showDefaultTranslationOrEmpty(event.subtitle) }}
          </v-list-item-subtitle>

          <v-list-item-subtitle class="text-caption">
            {{ formatDateByFormat(event.date) }}
          </v-list-item-subtitle>
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
import { formatDateByFormat } from '../../../../lib/ui';

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
