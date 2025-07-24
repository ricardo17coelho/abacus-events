<template>
  <ManageEventContainer v-if="currentEvent">
    <v-row v-if="isUserAdmin">
      <v-col align="end">
        <EventInformationsDialog
          :event-id="currentEvent.id"
          @success="mutateById($event.id, $event)"
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
      <v-col v-for="info in currentEvent.informations" :key="info.id">
        <v-card :title="showDefaultTranslationOrEmpty(info.title)">
          <template #text>
            <UiHtmlRender
              :content="showDefaultTranslationOrEmpty(info.content)"
            />
          </template>
          <template #actions>
            <VBtnPrimary @click="onDeleteItem(info)">
              {{ t('actions.delete') }}
            </VBtnPrimary>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </ManageEventContainer>
</template>

<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import useAuthUser from '@/composables/auth-user.ts';
import { toast } from 'vue-sonner';
import { type EventTimeline } from '@/api/types/EventTimeline.ts';
import { useI18n } from 'vue-i18n';
import ManageEventContainer from '@/components/manage/ManageEventContainer.vue';
import EventInformationsDialog from '@/components/event/event-informations/EventInformationsDialog.vue';
import useApiEventInformations from '@/api/event-informations.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import { UiHtmlRender } from '@lib/ui';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { isUserAdmin } = useAuthUser();

const { removeEventInformation } = useApiEventInformations();

const items = ref([]);

function mutateById(id: string, payload: EventTimeline) {
  const idx = items.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    Object.assign(items.value[idx], payload);
  } else {
    items.value.push(payload);
  }
}

const { t } = useI18n();

async function onDeleteItem(item: EventTimeline) {
  const { error } = await removeEventInformation(item.id);
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
