<template>
  <ManageEventContainer v-if="currentEvent">
    <div
      v-if="isUserAdmin"
      class="d-flex ga-2 align-self-sm-end flex-column flex-sm-row"
    >
      <!-- ADD -->
      <EventShuttlePlanDialog @success="onSaveSuccessShuttlePlan">
        <template #activator="{ props: ActivatorProps }">
          <VBtnPrimary color="primary" v-bind="ActivatorProps">
            {{ t('actions.add_ride') }}
          </VBtnPrimary>
        </template>
      </EventShuttlePlanDialog>

      <EventShuttlePlanAlertDialog @success="onSaveSuccessAlert">
        <template #activator="{ props: ActivatorProps }">
          <VBtnPrimary color="primary" v-bind="ActivatorProps">
            {{ t('actions.add_alert') }}
          </VBtnPrimary>
        </template>
      </EventShuttlePlanAlertDialog>
      <!-- EDIT -->
      <EventShuttlePlanDialog
        :event-shuttle-plan-id="currentEventShuttlePlantId"
        :model-value="currentEventShuttlePlantId !== undefined"
        @success="onSaveSuccessShuttlePlan"
        @update:model-value="currentEventShuttlePlantId = undefined"
      />

      <EventShuttlePlanAlertDialog
        :event-shuttle-plan-alert-id="currentEventShuttleAlertId"
        :model-value="currentEventShuttleAlertId !== undefined"
        @success="onSaveSuccessAlert"
        @update:model-value="currentEventShuttleAlertId = undefined"
      />
    </div>

    <v-alert
      v-for="alert in currentEvent.shuttle_plan_alerts"
      :key="alert.id"
      :icon="alert.icon"
      :text="showDefaultTranslationOrEmpty(alert.message)"
      :title="showDefaultTranslationOrEmpty(alert.title)"
      :type="alert.type"
      variant="tonal"
    >
      <template v-if="isUserAdmin" #append>
        <UiMenu :context="alert" :items="actionsAlert" show-activator />
      </template>
    </v-alert>

    <v-row>
      <v-col cols="12" md="6">
        <v-card height="100%">
          <template #title>
            <v-icon color="primary" size="x-small"> mdi-bus-clock </v-icon>
            {{ t('labels.outward_journey') }}
          </template>
          <v-card-item>
            <EventShuttlePlanTimeline :items="shuttlePlanOutward">
              <template v-if="isUserAdmin" #append="{ item }">
                <UiMenu :context="item" :items="actionsShuttlePlan">
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
            </EventShuttlePlanTimeline>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="100%">
          <template #title>
            <v-icon color="primary" size="x-small"> mdi-bus-clock </v-icon>
            {{ t('labels.return_journey') }}
          </template>

          <v-card-item>
            <EventShuttlePlanTimeline :items="shuttlePlanReturn">
              <template v-if="isUserAdmin" #append="{ item }">
                <UiMenu :context="item" :items="actionsShuttlePlan">
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
            </EventShuttlePlanTimeline>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </ManageEventContainer>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type {
  EventShuttleAlert,
  EventShuttlePlan,
} from '@/api/types/EventShuttlePlan.ts';
import { useI18n } from 'vue-i18n';
import EventShuttlePlanDialog from '@/components/event/event-shuttle-plan/EventShuttlePlanDialog.vue';
import EventShuttlePlanTimeline from '@/components/event/event-shuttle-plan/EventShuttlePlanTimeline.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import useAuthUser from '@/composables/auth-user.ts';
import { type MenuItem, UiMenu, useMenuActions } from '@lib/ui';
import { toast } from 'vue-sonner';
import useApiEventShuttlePlan from '@/api/event-shuttle-plan.ts';
import useApiEventShuttleAlert from '@/api/event-shuttle-plan-alert.ts';
import EventShuttlePlanAlertDialog from '@/components/event/event-shuttle-plan-alert/EventShuttlePlanAlertDialog.vue';
import ManageEventContainer from '@/components/manage/ManageEventContainer.vue';

const { t } = useI18n();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { isUserAdmin } = useAuthUser();

// ALERTS

function onSaveSuccessAlert(shuttlePlanAlert: EventShuttleAlert) {
  if (!currentEvent.value) return;

  const idx = currentEvent.value.shuttle_plan_alerts.findIndex(
    (r) => r.id === shuttlePlanAlert.id,
  );
  if (idx > -1) {
    Object.assign(
      currentEvent.value.shuttle_plan_alerts[idx],
      shuttlePlanAlert,
    );
  } else {
    currentEvent.value.shuttle_plan_alerts.push(shuttlePlanAlert);
  }
}

const { removeEventShuttleAlert } = useApiEventShuttleAlert();

async function onRemoveShuttlePlanAlert(id: string) {
  if (!currentEvent.value) return;

  const { error } = await removeEventShuttleAlert(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    const idx = currentEvent.value.shuttle_plan_alerts.findIndex(
      (u) => u.id === id,
    );
    if (idx > -1) {
      currentEvent.value.shuttle_plan_alerts.splice(idx, 1);
    }
  }
}

const currentEventShuttleAlertId = ref();

const { menuGlobalActions } = useMenuActions();
const actionsAlert = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventShuttleAlert) => {
      currentEventShuttleAlertId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventShuttleAlert) => onRemoveShuttlePlanAlert(item.id),
  },
]);

// SHUTTLE PLAN

const shuttlePlanOutward = computed(() =>
  currentEvent.value?.shuttle_plan.filter(
    (item) => item.direction === 'OUTWARD',
  ),
);

const shuttlePlanReturn = computed(() =>
  currentEvent.value?.shuttle_plan.filter(
    (item) => item.direction === 'RETURN',
  ),
);

function onSaveSuccessShuttlePlan(shuttlePlan: EventShuttlePlan) {
  if (!currentEvent.value) return;

  const idx = currentEvent.value.shuttle_plan.findIndex(
    (r) => r.id === shuttlePlan.id,
  );
  if (idx > -1) {
    Object.assign(currentEvent.value.shuttle_plan[idx], shuttlePlan);
  } else {
    currentEvent.value.shuttle_plan.push(shuttlePlan);
  }
}

const { removeEventShuttlePlan } = useApiEventShuttlePlan();

async function onRemoveShuttlePlan(id: string) {
  if (!currentEvent.value) return;

  const { error } = await removeEventShuttlePlan(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    const idx = currentEvent.value.shuttle_plan.findIndex((u) => u.id === id);
    if (idx > -1) {
      currentEvent.value.shuttle_plan.splice(idx, 1);
    }
  }
}

const currentEventShuttlePlantId = ref();

const actionsShuttlePlan = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventShuttlePlan) => {
      currentEventShuttlePlantId.value = item.id;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    action: (item: EventShuttlePlan) => onRemoveShuttlePlan(item.id),
  },
]);
</script>
