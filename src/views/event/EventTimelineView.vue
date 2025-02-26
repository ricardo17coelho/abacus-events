<template>
  <v-container class="align-center pa-0">
    <v-row>
      <v-col align="center">
        <AppTitle show-go-home-button :title="t('title.program')" />
      </v-col>
    </v-row>
    <AppLoader v-if="isLoading" />
    <template v-else>
      <div class="text-center">
        <v-chip-group
          v-model="currentCategoryFilter"
          class="categories-chip-group"
          color="primary"
          column
          mandatory
          mobile
        >
          <v-chip
            v-for="category in categories"
            :key="category.id"
            centered
            filter
            :prepend-icon="category.icon"
            :text="showDefaultTranslationOrEmpty(category.title)"
            :value="category.id"
            variant="outlined"
          />
        </v-chip-group>
      </div>

      <template v-if="currentCategoryFilter">
        <ContainerCentered v-if="images.length > 0" class="my-5">
          <AppImagesView :images="images">
            <template #activator="activatorProps">
              <v-btn
                v-bind="activatorProps"
                color="primary"
                :prepend-icon="imagesBtn.icon"
              >
                {{ imagesBtn.text }}
              </v-btn>
            </template>
          </AppImagesView>
        </ContainerCentered>
      </template>

      <v-row v-if="isUserAdmin">
        <v-col align="end">
          <EventTimelineDialog @success="mutateById($event.id, $event)">
            <template #activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                prepend-icon="mdi-plus"
                variant="text"
              >
                {{ t('buttons.add') }}
              </v-btn>
            </template>
          </EventTimelineDialog>
        </v-col>
      </v-row>

      <AppTimeline v-if="currentCategoryFilter" :items="sortedItems">
        <template v-if="isUserAdmin" #actions="{ item }">
          <EventTimelineDialog
            v-if="isUserAdmin"
            :event-timetable-id="item.id"
            @success="mutateById($event.id, $event)"
          >
            <template #activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" icon="mdi-pencil" variant="text" />
            </template>
          </EventTimelineDialog>
          <v-btn
            color="error"
            icon="mdi-delete"
            variant="text"
            @click="onDeleteItem(item)"
          />
        </template>
      </AppTimeline>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import AppTitle from '@/components/app/AppTitle.vue';
import AppTimeline from '@/components/app/AppTimeline.vue';
import useAuthUser from '@/composables/auth-user.ts';
import EventTimelineDialog from '@/components/event/event-timeline/EventTimelineDialog.vue';
import { toast } from 'vue-sonner';
import useApiProgramTimeline from '@/api/event-timeline.ts';
import {
  type EventTimeline,
  type EventTimelineCategory,
} from '@/api/types/EventTimeline.ts';
import { useI18n } from 'vue-i18n';
import AppLoader from '@/components/app/AppLoader.vue';
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
import AppImagesView from '@/components/app/AppImagesView.vue';
import useApiEventTimeline from '@/api/event-timeline.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const { isUserAdmin } = useAuthUser();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const currentCategoryFilter = ref();

const { removeEventTimeline, getEventTimelinesByCategoryId } =
  useApiProgramTimeline();

const items = ref<EventTimeline[]>([]);

const sortedItems = computed(() => {
  return items.value.slice().sort((a, b) => {
    if (!a || !a.time_start || !b || !b.time_start) return;
    const aStart = parseFloat(a.time_start.replace('.', '')) / 100;
    const bStart = parseFloat(b.time_start.replace('.', '')) / 100;
    if (aStart !== bStart) return aStart - bStart;
    if (!a || !a.time_end || !b || !b.time_end) return;
    const aEnd = parseFloat(a.time_end.replace('.', '')) / 100;
    const bEnd = parseFloat(b.time_end.replace('.', '')) / 100;
    return aEnd - bEnd;
  });
});

function mutateById(id: string, payload: EventTimeline) {
  const idx = items.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    if (payload.category === currentCategoryFilter.value) {
      Object.assign(items.value[idx], payload);
    } else {
      items.value = items.value.slice(1, idx);
    }
  } else {
    if (payload.category === currentCategoryFilter.value) {
      items.value.push(payload);
    }
  }
}

const { t } = useI18n();

const categories = ref<EventTimelineCategory[]>([]);

const { getEventTimelineCategories } = useApiEventTimeline();

async function initialFetch() {
  if (!currentEvent.value) return;
  const { data, error } = await getEventTimelineCategories(
    currentEvent.value?.id,
  );

  if (error) return;
  if (data) {
    categories.value = data;
    if (categories.value.length > 0) {
      currentCategoryFilter.value = categories.value[0].id;
    }
  }
}

initialFetch();

const isLoading = ref(false);
const fetchData = async () => {
  if (!currentEvent.value) return;
  items.value = [];
  isLoading.value = true;
  const { data, error } = await getEventTimelinesByCategoryId(
    currentEvent.value.id,
    currentCategoryFilter.value,
  );
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    items.value = data;
  }
  isLoading.value = false;
};

async function onDeleteItem(item: EventTimeline) {
  const { error } = await removeEventTimeline(item.id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  const idx = items.value.findIndex((i) => i.id === item.id);
  console.warn(idx);
  if (idx > -1) {
    items.value = items.value.slice(1, idx);
  }
}

watch(
  () => currentCategoryFilter.value,
  async (newValue) => {
    if (newValue) {
      void fetchData();
    }
  },
);

const images = computed(() => {
  // if (currentCategoryFilter.value === EVENT_TIMELINE_CATEGORY.BEVERAGE) {
  //   return [
  //     '/images/summer-part-2024/drinks.png',
  //     '/images/summer-part-2024/cocktails.png'
  //   ];
  // }
  // return ['/images/summer-part-2024/plan.png'];
  return [];
});

const imagesBtn = computed(() => {
  // if (currentCategoryFilter.value === EVENT_TIMELINE_CATEGORY.BEVERAGE) {
  //   return { text: t('labels.drinks'), icon: 'mdi-glass-cocktail' };
  // }

  return { text: t('labels.plan'), icon: 'mdi-map' };
});
</script>

<style scoped lang="scss">
.categories-chip-group :deep(.v-slide-group__content) {
  justify-content: center;
}
</style>
