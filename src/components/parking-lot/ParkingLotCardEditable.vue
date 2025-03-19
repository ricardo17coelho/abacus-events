<template>
  <ParkingLotCard
    :hide-full-text="hideFullText"
    :hide-icon="hideIcon"
    :parking-lot="parkingLot"
  >
    <template #actions>
      <ParkingLotDialog
        v-if="isUserAdmin"
        :parking-lot-id="parkingLot.id"
        @success="onSuccessUpdate"
      >
        <template #activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" icon="mdi-pencil" variant="text" />
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
</template>

<script setup lang="ts">
import { type ParkingLot } from '@/api/types/ParkingLot';
import ParkingLotDialog from '@/components/parking-lot/ParkingLotDialog.vue';
import ParkingLotCard from '@/components/parking-lot/ParkingLotCard.vue';
import useAuthUser from '@/composables/auth-user.ts';
import { toast } from 'vue-sonner';
import useApiParkingLot from '@/api/parking-lots.ts';
import { useI18n } from 'vue-i18n';

defineProps({
  parkingLot: {
    type: Object as PropType<ParkingLot>,
    default: () => ({}),
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
  hideFullText: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:success', 'remove']);

const { t } = useI18n();

const { updateParkingLot, removeParkingLot } = useApiParkingLot();
const { isUserAdminOrHelper, isUserAdmin } = useAuthUser();

function onSuccessUpdate(parkingLot: ParkingLot) {
  emit('update:success', parkingLot);
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
    onSuccessUpdate(data);
  }
}

async function onRemoveParkingLot(id: string) {
  const { error } = await removeParkingLot(id);
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  emit('remove', id);
}
</script>
