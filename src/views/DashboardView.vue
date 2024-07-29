<template>
  <UserGreetings />
  <v-container>
    <v-row v-if="isCurrentUserAdmin">
      <v-col align="end">
        <ParkingLotDialog @success="onSuccessUpdate">
          <template #activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              variant="text"
              prepend-icon="mdi-plus"
            >
              Add
            </v-btn>
          </template>
        </ParkingLotDialog>
      </v-col>
    </v-row>
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
              v-if="isCurrentUserAdmin"
              :parking-lot-id="parkingLot.id"
              @success="onSuccessUpdate"
            >
              <template #activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" variant="text" icon="mdi-pencil">
                </v-btn>
              </template>
            </ParkingLotDialog>
          </template>
          <v-card-actions v-if="isCurrentUserAdminOrHelper">
            <v-number-input
              :model-value="parkingLot.filled_slots"
              color="primary"
              bg-color="primary"
              control-variant="split"
              :min="0"
              :max="parkingLot.total_slots"
              @update:model-value="onUpdateFilledSlot($event, parkingLot.id)"
            ></v-number-input>
          </v-card-actions>
        </ParkingLotCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useApiParkingLot from '@/api/parking-lots';
import ParkingLotCard from '@/components/ParkingLot/ParkingLotCard.vue';
import ParkingLotDialog from '@/components/ParkingLot/ParkingLotDialog.vue';
import UserGreetings from '@/components/UserGreetings.vue';
import { useAuthStore } from '@/stores/auth';
import type { ParkingLot } from '@/types/ParkingLot';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots, updateParkingLot } = useApiParkingLot();
const { isCurrentUserAdminOrHelper, isCurrentUserAdmin } = useAuthStore();

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

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function mutateParkingLotById(id: string, payload: Record<any, any>) {
  console.warn('mutateParkingLotById', id, payload);
  const idx = parkingLots.value.findIndex((i) => i.id === id);
  console.warn('idx', idx);
  if (idx > -1) {
    Object.assign(parkingLots.value[idx], payload);
  }
}

async function onUpdateFilledSlot(value: number, id: string) {
  const payload = {
    filled_slots: value
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
</script>
