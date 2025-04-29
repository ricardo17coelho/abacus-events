<template>
  <v-container
    v-if="currentEvent"
    class="d-flex justify-center flex-column ga-10 ma-0"
    fluid
  >
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
          <UiDialog max-width="600">
            <template #activator="{ props: ActivatorProps }">
              <v-icon-btn
                v-bind="ActivatorProps"
                icon="mdi-pencil"
                icon-size="small"
              />
            </template>
            <template #content>
              <EventTimelineCategoriesTable />
            </template>
          </UiDialog>
        </v-chip-group>
      </div>

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

<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import AppLoader from '@/components/app/AppLoader.vue';
import AppTimeline from '@/components/app/AppTimeline.vue';
import EventTimelineDialog from '@/components/event/event-timeline/EventTimelineDialog.vue';
import useAuthUser from '@/composables/auth-user.ts';
import { toast } from 'vue-sonner';
import useApiProgramTimeline from '@/api/event-timeline.ts';
import { type EventTimeline } from '@/api/types/EventTimeline.ts';
import { useI18n } from 'vue-i18n';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import useEventProgram from '@/composables/event-program.ts';
import EventTimelineCategoriesTable from '@/components/event/event-timeline/event-timeline-categories/EventTimelineCategoriesTable.vue';
import { UiDialog } from '@lib/ui';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

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
  if (idx > -1) {
    items.value.splice(idx, 1);
  }
}
</script>

<style scoped lang="scss">
.categories-chip-group :deep(.v-slide-group__content) {
  justify-content: center;
}
</style>
