<template>
  <Page>
    <PageHeading title="Parking Lots">
      <template #actions>
        <ParkingLotDialog v-if="isUserAdmin" @success="onSuccessUpdate">
          <template #activator="{ props: activatorProps }">
            <VBtnPrimary v-bind="activatorProps" prepend-icon="mdi-plus">
              {{ t('actions.add') }}
            </VBtnPrimary>
          </template>
        </ParkingLotDialog>
      </template>
    </PageHeading>

    <PageContent>
      <v-row>
        <v-col
          v-for="parkingLot in parkingLots"
          :key="parkingLot.id"
          cols="12"
          lg="6"
        >
          <ParkingLotCard :parking-lot="parkingLot">
            <template #actions>
              <ParkingLotDialog
                v-if="isUserAdmin"
                :parking-lot-id="parkingLot.id"
                @success="onSuccessUpdate"
              >
                <template #activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    icon="mdi-pencil"
                    variant="text"
                  />
                </template>
              </ParkingLotDialog>
              <v-btn
                v-if="isUserAdmin"
                color="error"
                icon="mdi-delete"
                variant="text"
                @click="onRemoveParkingLot(parkingLot.id)"
              />
            </template>
            <v-card-actions v-if="isUserAdminOrHelper">
              <v-number-input
                bg-color="primary"
                color="primary"
                control-variant="split"
                :max="parkingLot.total_slots"
                :min="0"
                :model-value="parkingLot.filled_slots"
                @update:model-value="onUpdateFilledSlot($event, parkingLot.id)"
              />
            </v-card-actions>
          </ParkingLotCard>
        </v-col>
      </v-row>
    </PageContent>
  </Page>
</template>

<script setup lang="ts">
import useApiParkingLot from '@/api/parking-lots';
import ParkingLotCard from '@/components/parking-lot/ParkingLotCard.vue';
import ParkingLotDialog from '@/components/parking-lot/ParkingLotDialog.vue';
import useAuthUser from '@/composables/auth-user.ts';
import type { ParkingLot } from '@/api/types/ParkingLot';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { Page, PageContent, PageHeading } from '@/components/page/';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots, updateParkingLot, removeParkingLot } =
  useApiParkingLot();
const { isUserAdminOrHelper, isUserAdmin } = useAuthUser();

const fetchData = async () => {
  const { data, error } = await getParkingLots();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    parkingLots.value = data;
  }
};

onMounted(() => {
  fetchData();
});

function mutateParkingLotById(id: string, payload: ParkingLot) {
  const idx = parkingLots.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    Object.assign(parkingLots.value[idx], payload);
  } else {
    parkingLots.value.push(payload);
  }
}

async function onUpdateFilledSlot(value: number, id: string) {
  const payload = {
    filled_slots: value,
  };
  const { data, error } = await updateParkingLot(id, payload);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    mutateParkingLotById(id, data);
  }
}

function onSuccessUpdate(parkingLot: ParkingLot) {
  mutateParkingLotById(parkingLot.id, parkingLot);
}

async function onRemoveParkingLot(id: string) {
  const { error } = await removeParkingLot(id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  const idx = parkingLots.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    parkingLots.value.splice(idx, 1);
  }
  toast.error('Deleted');
}
</script>
