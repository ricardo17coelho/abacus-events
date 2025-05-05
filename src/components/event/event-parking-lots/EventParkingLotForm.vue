<template>
  <v-form ref="formRef"
    ><v-row dense>
      <v-col>
        <EventParkingLotFieldSelect
          v-model="model.parking_lot_id"
          :label="t('labels.location_name')"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import EventParkingLotFieldSelect from '@/components/event/event-parking-lots/EventParkingLotFieldSelect.vue';
// utils
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
