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
              <VBtnPrimary v-bind="activatorProps" prepend-icon="mdi-plus">
                {{ t('actions.add') }}
              </VBtnPrimary>
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
import { type EventTimeline } from '@/api/types/EventTimeline.ts';
import { useI18n } from 'vue-i18n';
import AppLoader from '@/components/app/AppLoader.vue';
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
import AppImagesView from '@/components/app/AppImagesView.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import useEventProgram from '@/composables/event-program.ts';

const { isUserAdmin } = useAuthUser();

const { removeEventTimeline } = useApiProgramTimeline();

const { items, sortedItems, currentCategoryFilter, categories, isLoading } =
  useEventProgram();

function mutateById(id: string, payload: EventTimeline) {
  const idx = items.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    if (payload.category === currentCategoryFilter.value) {
      Object.assign(items.value[idx], payload);
    } else {
      items.value.splice(idx, 1);
    }
  } else {
    if (payload.category === currentCategoryFilter.value) {
      items.value.push(payload);
    }
  }
}

const { t } = useI18n();

async function onDeleteItem(item: EventTimeline) {
  const { error } = await removeEventTimeline(item.id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  const idx = items.value.findIndex((i) => i.id === item.id);
  console.warn(idx);
  if (idx > -1) {
    items.value.splice(idx, 1);
  }
}

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
