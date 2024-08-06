<template>
  <v-container class="align-center pa-0">
    <v-row>
      <v-col align="center">
        <AppTitle :title="$t('title.program')" />
      </v-col>
    </v-row>
    <AppLoader v-if="isLoading" />
    <template v-else>
      <div class="text-center">
        <v-chip-group
          v-model="currentCategoryFilter"
          class="categories-chip-group"
          color="primary"
          mandatory
          mobile
          column
        >
          <v-chip
            v-for="category in categories"
            :key="category.title"
            :text="category.title"
            :value="category.value"
            :prepend-icon="category.icon"
            variant="outlined"
            filter
            centered
          ></v-chip>
        </v-chip-group>
      </div>
      <v-row v-if="isCurrentUserAdmin">
        <v-col align="end">
          <ProgramTimelineDialog
            category="ADULTS"
            @success="mutateById($event.id, $event)"
          >
            <template #activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                variant="text"
                prepend-icon="mdi-plus"
              >
                Add
              </v-btn>
            </template>
          </ProgramTimelineDialog>
        </v-col>
      </v-row>
      <AppTimeline :items="sortedItems">
        <template v-if="isCurrentUserAdmin" #actions="{ item }">
          <ProgramTimelineDialog
            v-if="isCurrentUserAdmin"
            :program-timetable-id="item.id"
            category="ADULTS"
            @success="mutateById($event.id, $event)"
          >
            <template #activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" variant="text" icon="mdi-pencil">
              </v-btn>
            </template>
          </ProgramTimelineDialog>
          <v-btn
            color="error"
            variant="text"
            icon="mdi-delete"
            @click="onDeleteItem(item)"
          >
          </v-btn>
        </template>
      </AppTimeline>
      <ContainerCentered>
        <AppGallery :images="images"></AppGallery>
      </ContainerCentered>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import AppTitle from '@/components/app/AppTitle.vue';
import AppTimeline from '@/components/app/AppTimeline.vue';
import { useAuthStore } from '@/stores/auth';
import ProgramTimelineDialog from '@/components/program/program-timetable/ProgramTimelineDialog.vue';
import { toast } from 'vue-sonner';
import useApiProgramTimeline from '@/api/program-timeline';
import {
  PROGRAM_TIMELINE_CATEGORY,
  type ProgramTimeline,
  type ProgramTimelineCategory
} from '@/api/types/ProgramTimeline';
import { useI18n } from 'vue-i18n';
import AppLoader from '@/components/app/AppLoader.vue';
import useProgramCategories from '@/composables/program-categories';
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
import AppGallery from '@/components/app/AppGallery.vue';

const { isCurrentUserAdmin } = useAuthStore();

const currentCategoryFilter = ref<ProgramTimelineCategory>(
  PROGRAM_TIMELINE_CATEGORY.ADULTS
);

const { getProgramTimelinesByCategory, removeProgramTimeline } =
  useApiProgramTimeline();

const items = ref<ProgramTimeline[]>([]);

const sortedItems = computed(() => {
  return items.value.slice().sort((a, b) => {
    const aStart = parseFloat(a.time_start.replace('.', '')) / 100;
    const bStart = parseFloat(b.time_start.replace('.', '')) / 100;
    if (aStart !== bStart) return aStart - bStart;
    const aEnd = parseFloat(a.time_end.replace('.', '')) / 100;
    const bEnd = parseFloat(b.time_end.replace('.', '')) / 100;
    return aEnd - bEnd;
  });
});

function mutateById(id: string, payload: ProgramTimeline) {
  const idx = items.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    Object.assign(items.value[idx], payload);
  } else {
    if (payload.category === currentCategoryFilter.value) {
      items.value.push(payload);
    }
  }
}

const { t } = useI18n();

const isLoading = ref(false);
const fetchData = async () => {
  isLoading.value = true;
  const { data, error } = await getProgramTimelinesByCategory(
    currentCategoryFilter.value
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

fetchData();

async function onDeleteItem(item: ProgramTimeline) {
  const { error } = await removeProgramTimeline(item.id);
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

const { categories } = useProgramCategories();

watch(
  () => currentCategoryFilter.value,
  async (newValue) => {
    if (newValue) {
      fetchData();
    }
  }
);

const images = computed(() => {
  if (
    [PROGRAM_TIMELINE_CATEGORY.ADULTS, PROGRAM_TIMELINE_CATEGORY.KIDS].includes(
      currentCategoryFilter.value
    )
  ) {
    return ['/images/plan.png'];
  } else if (currentCategoryFilter.value === PROGRAM_TIMELINE_CATEGORY.FOOD) {
    return [];
  } else if (
    currentCategoryFilter.value === PROGRAM_TIMELINE_CATEGORY.BEVERAGE
  ) {
    return ['/images/drinks.png', '/images/cocktails.png'];
  }

  return [];
});
</script>

<style scoped lang="scss">
.categories-chip-group :deep(.v-slide-group__content) {
  justify-content: center;
}
</style>
