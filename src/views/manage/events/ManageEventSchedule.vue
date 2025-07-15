<template>
  <ManageEventContainer v-if="currentEvent">
    <div
      v-if="isUserAdmin"
      class="d-flex ga-2 align-self-sm-end flex-column flex-sm-row"
    >
      <!-- ADD -->
      <EventScheduleDialog @success="onSaveSuccessSchedule">
        <template #activator="{ props: ActivatorProps }">
          <VBtnPrimary color="primary" v-bind="ActivatorProps">
            {{ t('actions.add_schedule') }}
          </VBtnPrimary>
        </template>
      </EventScheduleDialog>

      <EventScheduleAlertDialog @success="onSaveSuccessAlert">
        <template #activator="{ props: ActivatorProps }">
          <VBtnPrimary color="primary" v-bind="ActivatorProps">
            {{ t('actions.add_alert') }}
          </VBtnPrimary>
        </template>
      </EventScheduleAlertDialog>

      <EventScheduleAlertDialog
        :event-schedule-alert-id="currentEventScheduleAlertId"
        :model-value="currentEventScheduleAlertId !== undefined"
        @success="onSaveSuccessAlert"
        @update:model-value="currentEventScheduleAlertId = undefined"
      />
    </div>

    <v-alert
      v-for="alert in currentEvent.schedule_alerts"
      :key="alert.id"
      :icon="alert.icon"
      :title="showDefaultTranslationOrEmpty(alert.title)"
      :type="alert.type"
      variant="tonal"
    >
      <template v-if="isUserAdmin" #append>
        <UiMenu :context="alert" :items="actionsAlert" show-activator />
      </template>
      <template #text>
        <UiHtmlRender :content="showDefaultTranslationOrEmpty(alert.message)" />
      </template>
    </v-alert>

    <v-row>
      <v-col
        v-for="schedule in currentEvent.schedule"
        :key="schedule.id"
        cols="12"
        md="auto"
        sm="6"
      >
        <v-card
          height="100%"
          :min-width="width > 350 ? 300 : '100%'"
          :subtitle="showDefaultTranslationOrEmpty(schedule.description)"
          width="100%"
        >
          <template #title>
            <v-icon color="primary" size="x-small">
              {{ schedule.icon }}
            </v-icon>
            {{ showDefaultTranslationOrEmpty(schedule.title) }}
          </template>
          <template #append>
            <EventScheduleItemDialog :event-schedule-id="schedule.id">
              <template #activator="{ props: ActivatorProps }">
                <VBtnPrimary
                  density="compact"
                  icon="mdi-plus"
                  variant="text"
                  v-bind="ActivatorProps"
                />
              </template>
            </EventScheduleItemDialog>

            <UiMenu
              v-if="isUserAdmin"
              :context="schedule"
              :items="actionsSchedule"
            >
              <template #activator="{ props: ActivatorProps }">
                <v-btn
                  v-bind="ActivatorProps"
                  class="ml-2"
                  density="compact"
                  icon="mdi-dots-vertical"
                  variant="text"
                ></v-btn>
              </template>
            </UiMenu>
            <!-- EDIT -->
            <EventScheduleDialog
              :event-schedule-id="currentEventScheduleId"
              :model-value="currentEventScheduleId === schedule.id"
              @success="onSaveSuccessSchedule"
              @update:model-value="currentEventScheduleId = undefined"
            />
          </template>
          <v-card-item>
            <EventScheduleItemTimeline
              v-if="schedule.items"
              :items="schedule.items"
            >
              <template v-if="isUserAdmin" #append="{ item }">
                <UiMenu :context="item" :items="actionsScheduleItem">
                  <template #activator="{ props: ActivatorProps }">
                    <v-btn
                      v-bind="ActivatorProps"
                      class="ml-2"
                      density="compact"
                      icon="mdi-dots-vertical"
                      variant="text"
                    ></v-btn>
                  </template>
                </UiMenu>
              </template>
            </EventScheduleItemTimeline>
          </v-card-item>
        </v-card>
        <EventScheduleItemDialog
          :event-schedule-id="schedule.id"
          :event-schedule-item-id="currentEventScheduleItemId"
          :model-value="currentEventScheduleItemId !== undefined"
          @success="onSaveSuccessScheduleItem"
          @update:model-value="currentEventScheduleItemId = undefined"
        />
      </v-col>
    </v-row>
  </ManageEventContainer>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type {
  EventSchedule,
  EventScheduleAlert,
  EventScheduleItem,
} from '@/api/types/EventSchedule.ts';
import { useI18n } from 'vue-i18n';
import EventScheduleDialog from '@/components/event/event-schedule/EventScheduleDialog.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import useAuthUser from '@/composables/auth-user.ts';
import { type MenuItem, UiHtmlRender, UiMenu, useMenuActions } from '@lib/ui';
import { toast } from 'vue-sonner';
import useApiEventSchedule from '@/api/event-schedule.ts';
import useApiEventScheduleAlert from '@/api/event-schedule-alert.ts';
import EventScheduleAlertDialog from '@/components/event/event-schedule/event-schedule-alert/EventScheduleAlertDialog.vue';
import ManageEventContainer from '@/components/manage/ManageEventContainer.vue';
import EventScheduleItemDialog from '@/components/event/event-schedule/event-schedule-items/EventScheduleItemDialog.vue';
import EventScheduleItemTimeline from '@/components/event/event-schedule/event-schedule-items/EventScheduleItemTimeline.vue';
import { useDisplay } from 'vuetify';

const { t } = useI18n();
const { width } = useDisplay();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { isUserAdmin } = useAuthUser();

// ALERTS

function onSaveSuccessAlert(eventScheduleAlert: EventScheduleAlert) {
  if (!currentEvent.value) return;

  const idx = currentEvent.value.schedule_alerts.findIndex(
    (r) => r.id === eventScheduleAlert.id,
  );
  if (idx > -1) {
    Object.assign(currentEvent.value.schedule_alerts[idx], eventScheduleAlert);
  } else {
    currentEvent.value.schedule_alerts.push(eventScheduleAlert);
  }
}

const { removeEventScheduleAlert } = useApiEventScheduleAlert();

async function onRemoveScheduleAlert(id: string) {
  if (!currentEvent.value) return;

  const { error } = await removeEventScheduleAlert(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    const idx = currentEvent.value.schedule_alerts.findIndex(
      (u) => u.id === id,
    );
    if (idx > -1) {
      currentEvent.value.schedule_alerts.splice(idx, 1);
    }
  }
}

const currentEventScheduleAlertId = ref();

const { menuGlobalActions } = useMenuActions();
const actionsAlert = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventScheduleAlert) => {
      currentEventScheduleAlertId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventScheduleAlert) => onRemoveScheduleAlert(item.id),
  },
]);

// SCHEDULE
function onSaveSuccessSchedule(eventSchedule: EventSchedule) {
  if (!currentEvent.value) return;

  const idx = currentEvent.value.schedule.findIndex(
    (r) => r.id === eventSchedule.id,
  );
  if (idx > -1) {
    Object.assign(currentEvent.value.schedule[idx], eventSchedule);
  } else {
    currentEvent.value.schedule.push(eventSchedule);
  }
}

const { removeEventSchedule } = useApiEventSchedule();

async function onRemoveSchedule(id: string) {
  if (!currentEvent.value) return;

  const { error } = await removeEventSchedule(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    const idx = currentEvent.value.schedule.findIndex((u) => u.id === id);
    if (idx > -1) {
      currentEvent.value.schedule.splice(idx, 1);
    }
  }
}

const currentEventScheduleId = ref();

const actionsSchedule = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventSchedule) => {
      currentEventScheduleId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventSchedule) => onRemoveSchedule(item.id),
  },
]);

// Event Schedule Item

function onSaveSuccessScheduleItem(eventScheduleItem: EventScheduleItem) {
  console.warn('onSaveSuccessScheduleItem', eventScheduleItem);
}

function onRemoveScheduleItem(eventScheduleItem: EventScheduleItem) {
  console.warn('onSaveSuccessScheduleItem', eventScheduleItem);
}

const currentEventScheduleItemId = ref();

const actionsScheduleItem = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventScheduleItem) => {
      currentEventScheduleItemId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventScheduleItem) => onRemoveScheduleItem(item.id),
  },
]);
</script>
