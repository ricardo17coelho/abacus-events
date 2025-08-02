<template>
  <div v-if="isLoading">
    <AppLoader />
  </div>
  <ErrorNotFound v-else-if="!currentEvent" />
  <router-view v-else />
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import AppLoader from '@/components/app/AppLoader.vue';
import { useParams } from '@/composables/route';
import useApiEvents from '@/api/events.ts';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import type { Event } from '@/api/types/Event';
import ErrorNotFound from '@/components/errors/ErrorNotFound.vue';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys';
import useBrand from '@/composables/brand.ts';
import useApiParkingLot from '@/api/parking-lots.ts';
import { supabase } from '@/services/supabase.ts';

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
    clearBrand();
    if (
      newValue &&
      (newValue.color_primary ||
        newValue.color_secondary ||
        newValue.color_tertiary)
    ) {
      setBrand(
        newValue.color_primary,
        newValue?.color_secondary,
        newValue?.color_tertiary,
      );
    } else {
      clearBrand();
    }
  },
  { deep: true },
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

// PARKING LOTS
const { getParkingLotsByEventId } = useApiParkingLot();

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function mutateParkingLotById(id: string, payload: Record<any, any>) {
  if (!currentEvent.value) return;
  const idx = currentEvent.value.parking_lots.findIndex((i) => i.id === id);
  if (idx > -1) {
    Object.assign(currentEvent.value?.parking_lots[idx], payload);
  }
}

const fetchDataParkingLots = async () => {
  if (!currentEvent.value?.id) return;
  const { data, error } = await getParkingLotsByEventId(currentEvent.value?.id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data && currentEvent.value) {
    currentEvent.value.parking_lots = data;
  }
};

const subscribeToChanges = () => {
  const channel = supabase
    .channel('parking_lots')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'parking_lots' },
      (payload) => {
        fetchDataParkingLots();
        if (payload.new) {
          mutateParkingLotById(payload.new.id, payload.new);
        }
      },
    )
    .subscribe();

  return channel;
};

onMounted(() => {
  const subscription = subscribeToChanges();
  onUnmounted(() => {
    supabase.removeChannel(subscription);
  });
});
</script>
