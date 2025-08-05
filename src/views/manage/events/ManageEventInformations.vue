<template>
  <ManageEventContainer v-if="currentEvent">
    <v-chip-group
      v-model="currentCategoryFilter"
      class="categories-chip-group"
      color="primary"
      column
      mandatory
      mobile
    >
      <v-chip
        v-for="category in categoriesSorted"
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
          <EventInformationsCategoriesTable />
        </template>
      </UiDialog>
    </v-chip-group>

    <v-row v-if="isUserAdmin">
      <v-col align="end">
        <EventInformationsDialog
          :event-id="currentEvent.id"
          @success="onSuccess"
        >
          <template #activator="{ props: activatorProps }">
            <VBtnPrimary v-bind="activatorProps" prepend-icon="mdi-plus">
              {{ t('actions.add') }}
            </VBtnPrimary>
          </template>
        </EventInformationsDialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="info in itemsSorted" :key="info.id" cols="12" :md="6">
        <v-card
          height="100%"
          :title="showDefaultTranslationOrEmpty(info.title)"
        >
          <template #text>
            <UiHtmlRender
              :content="showDefaultTranslationOrEmpty(info.content)"
            />
          </template>
          <template #append>
            <UiMenu :context="info" :items="actionsAlert" show-activator />
          </template>
        </v-card>
      </v-col>
    </v-row>
    <EventInformationsDialog
      :event-id="currentEvent.id"
      :event-informations-id="currentEventInformationId"
      :model-value="currentEventInformationId !== undefined"
      @success="onSuccess"
      @update:model-value="currentEventInformationId = undefined"
    />
  </ManageEventContainer>
</template>

<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import useAuthUser from '@/composables/auth-user.ts';
import { toast } from 'vue-sonner';
import { type EventInformation } from '@/api/types/EventInformation.ts';
import { useI18n } from 'vue-i18n';
import ManageEventContainer from '@/components/manage/ManageEventContainer.vue';
import EventInformationsDialog from '@/components/event/event-informations/EventInformationsDialog.vue';
import useApiEventInformations from '@/api/event-informations.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import {
  type MenuItem,
  UiDialog,
  UiHtmlRender,
  UiMenu,
  useMenuActions,
} from '@lib/ui';
import useEventInformations from '@/composables/event-informations.ts';
import EventInformationsCategoriesTable from '@/components/event/event-informations/event-informations-categories/EventInformationsCategoriesTable.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { isUserAdmin } = useAuthUser();

const { removeEventInformation } = useApiEventInformations();

const { itemsSorted, items, categoriesSorted, currentCategoryFilter } =
  useEventInformations({ autoSelectFirst: true });

function onSuccess(payload: EventInformation) {
  const idx = items.value.findIndex((i) => i.id === payload.id);
  if (idx > -1) {
    Object.assign(items.value[idx], payload);
  } else {
    items.value.push(payload);
  }
}

const { t } = useI18n();

async function onDeleteItem(id: string) {
  const { error } = await removeEventInformation(id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  const idx = items.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    items.value.splice(idx, 1);
  }
}

const currentEventInformationId = ref();

const { menuGlobalActions } = useMenuActions();
const actionsAlert = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventInformation) => {
      currentEventInformationId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventInformation) => onDeleteItem(item.id),
  },
]);
</script>
