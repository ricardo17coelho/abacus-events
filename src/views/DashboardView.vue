<template>
  <UserGreetings />

  <v-container>
    <v-row>
      <v-col
        v-for="parkingLot in parkingLots"
        :key="parkingLot.id"
        cols="12"
        lg="6"
      >
        <ParkingLotCard :parking-lot="parkingLot">
          <v-card-actions v-if="isCurrentUserAdminOrHelper">
            <v-row class="pa-2">
              <v-col>
                <v-btn
                  variant="flat"
                  block
                  color="primary"
                  :disabled="parkingLot.filled_slots >= parkingLot.total_slots"
                  @click="onClickUp(parkingLot)"
                >
                  Up +
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  variant="flat"
                  block
                  color="secondary"
                  :disabled="parkingLot.filled_slots === 0"
                  @click="onClickDown(parkingLot)"
                >
                  Down -
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </ParkingLotCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useApiParkingLot from '@/api/parking-lots';
import ParkingLotCard from '@/components/ParkingLotCard.vue';
import UserGreetings from '@/components/UserGreetings.vue';
import { useAuthStore } from '@/stores/auth';
import type { ParkingLot } from '@/types/ParkingLot';
import { toast } from 'vue-sonner';

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots, updateParkingLot } = useApiParkingLot();
const { isCurrentUserAdminOrHelper } = useAuthStore();

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
  const idx = parkingLots.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    Object.assign(parkingLots.value[idx], payload);
  }
}

async function onClickUp(parkingLot: ParkingLot) {
  const payload = {
    filled_slots: parkingLot.filled_slots + 1
  };
  const { data, error } = await updateParkingLot(parkingLot.id, payload);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    mutateParkingLotById(parkingLot.id, data);
  }
}

async function onClickDown(parkingLot: ParkingLot) {
  const payload = {
    filled_slots: parkingLot.filled_slots - 1
  };
  const { data, error } = await updateParkingLot(parkingLot.id, payload);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    mutateParkingLotById(parkingLot.id, data);
  }
}
</script>
