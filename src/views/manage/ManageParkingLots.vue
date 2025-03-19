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
          <ParkingLotCardEditable
            :parking-lot="parkingLot"
            @remove="onRemoveParkingLot"
            @update:success="onSuccessUpdate"
          />
        </v-col>
      </v-row>
    </PageContent>
  </Page>
</template>

<script setup lang="ts">
import useApiParkingLot from '@/api/parking-lots';
import ParkingLotDialog from '@/components/parking-lot/ParkingLotDialog.vue';
import useAuthUser from '@/composables/auth-user.ts';
import type { ParkingLot } from '@/api/types/ParkingLot';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { Page, PageContent, PageHeading } from '@/components/page/';
import ParkingLotCardEditable from '@/components/parking-lot/ParkingLotCardEditable.vue';

const { t } = useI18n();

const parkingLots = ref<ParkingLot[]>([]);

const { getParkingLots } = useApiParkingLot();

const { isUserAdmin } = useAuthUser();

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

function onSuccessUpdate(payload: ParkingLot) {
  const idx = parkingLots.value.findIndex((i) => i.id === payload.id);
  if (idx > -1) {
    Object.assign(parkingLots.value[idx], payload);
  } else {
    parkingLots.value.push(payload);
  }
}

async function onRemoveParkingLot(id: string) {
  const idx = parkingLots.value.findIndex((i) => i.id === id);
  if (idx > -1) {
    parkingLots.value.splice(idx, 1);
    toast.success('Deleted');
  }
}
</script>
