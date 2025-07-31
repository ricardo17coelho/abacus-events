<template>
  <v-container v-if="currentEvent">
    <v-row>
      <v-col align="center">
        <TheAppTitle show-go-home-button :title="t('title.parking')" />
      </v-col>
    </v-row>
    <v-alert border="start" class="my-6" density="compact" rounded="lg">
      <v-icon>mdi-information-variant-circle-outline</v-icon>
      {{ t('views.parking.alert_01') }}
    </v-alert>
    <v-row>
      <v-col
        v-for="parkingLot in currentEvent.parking_lots"
        :key="parkingLot.id"
        cols="12"
        lg="6"
      >
        <ParkingLotCard :parking-lot="parkingLot" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ParkingLotCard from '@/components/parking-lot/ParkingLotCard.vue';
import TheAppTitle from '@/components/app/TheAppTitle.vue';
import { useI18n } from 'vue-i18n';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const { t } = useI18n();

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
