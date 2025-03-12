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
import useBrand from '@/composables/brand.ts';

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

const { setBrand, clearBrand } = useBrand();

const currentCompanyBrand = computed(() => currentEvent.value?.brand);

watch(
  () => currentCompanyBrand.value,
  (newValue) => {
    if (newValue && (newValue.color_primary || newValue.color_secondary)) {
      setBrand(newValue.color_primary, newValue?.color_secondary);
    } else {
      clearBrand();
    }
  },
);

function clear() {
  currentEvent.value = undefined;
  clearBrand();
}

watch(
  () => params.value.eventId,
  (newValue) => {
    if (newValue) {
      fetchData(newValue);
    } else {
      clear();
    }
  },
  { immediate: true },
);

onUnmounted(() => clear());
</script>
