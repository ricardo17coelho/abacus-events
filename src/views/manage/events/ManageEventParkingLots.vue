<template>
  <ManageEventContainer v-if="currentEvent">
    <PageHeading>
      <template #title>
        <span class="text-h6">{{ t('labels.features.PARKING') }}</span>
      </template>
      <template #actions>
        <EventParkingLotDialog>
          <template #activator="{ props: ActivatorProps }">
            <VBtnPrimary v-bind="ActivatorProps">
              {{ t('actions.add') }}
            </VBtnPrimary>
          </template>
        </EventParkingLotDialog>
      </template>
    </PageHeading>
    <v-row>
      <v-col
        v-for="parkingLot in currentEvent.parking_lots"
        :key="parkingLot.id"
        cols="12"
        lg="6"
      >
        <ParkingLotCard :parking-lot="parkingLot">
          <template #actions>
            <v-btn
              color="error"
              icon="mdi-delete"
              variant="text"
              @click="onRemove(parkingLot.id)"
            />
          </template>
        </ParkingLotCard>
      </v-col>
    </v-row>
  </ManageEventContainer>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import EventParkingLotDialog from '@/components/event/event-parking-lots/EventParkingLotDialog.vue';
import { useI18n } from 'vue-i18n';
import ParkingLotCard from '@/components/parking-lot/ParkingLotCard.vue';
import useApiEventParkingLot from '@/api/event-parking-lots.ts';
import { toast } from 'vue-sonner';
import { PageHeading } from '@/components/page';
import ManageEventContainer from '@/components/manage/ManageEventContainer.vue';

const { t } = useI18n();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { removeEventParkingLot } = useApiEventParkingLot();

async function onRemove(id: string) {
  if (!currentEvent.value) return;
  const { error } = await removeEventParkingLot(currentEvent.value.id, id);

  if (error) {
    toast.error(error.message);
    return;
  }
}
</script>
