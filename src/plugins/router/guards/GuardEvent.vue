<template>
  <div v-if="isLoading">
    <AppLoader />
  </div>
  <ErrorNotFound v-else-if="!currentEvent" />
  <router-view v-else />
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
// components
import AppLoader from '@/components/app/AppLoader.vue';
// composables
import { useParams } from '@/composables/route';
import useApiEvents from '@/api/events.ts';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import type { Event } from '@/api/types/Event';
import ErrorNotFound from '@/components/errors/ErrorNotFound.vue';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys';

const { t } = useI18n();

const isLoading = ref(true);
const currentEvent = ref<Event>();
provide(CURRENT_EVENT_KEY, currentEvent);

const params = useParams<{ eventId: string }>();

const { getEventByIdOrSlug } = useApiEvents();

const fetchData = async (id: string) => {
  const { data, error } = await getEventByIdOrSlug(id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    currentEvent.value = data;
  }

  isLoading.value = false;
};

watch(
  () => params.value.eventId,
  (newValue) => {
    if (newValue) {
      fetchData(newValue);
    }
  },
  { immediate: true }
);
</script>
