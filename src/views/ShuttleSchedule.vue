<template>
  <v-container class="align-center">
    <v-row>
      <v-col align="center">
        <AppTitle :title="$t('title.shuttle_schedule')" />
      </v-col>
    </v-row>
    <ContainerCentered class="px-0">
      <v-card flat max-width="500" class="px-2">
        <v-alert
          class="my-6"
          type="warning"
          variant="tonal"
          border="start"
          rounded="lg"
        >
          PAUSE 19.00-21.30
        </v-alert>
        <v-card class="my-6" title="Hinfahrt">
          <template #subtitle> 13:30-19:00 Uhr (im 30min Takt) </template>
          <v-card-text>
            St.Gallen Bahnhof, Lagerstrasse Via Haltestelle Hodlerstrasse nach
            Abacus, Bruggwaldstrasse Shuttlefahrten
          </v-card-text>
        </v-card>

        <v-card class="my-6" title="Rücktransport">
          <template #subtitle> 21:30-01:30 Uhr (im 30min Takt) </template>
          <v-card-text>
            <div>
              Abacus, Bruggwaldstrasse via Hodlerstrasse/Hotel Radisson (Falls
              Fahrgäste dort aussteigen wollen-HALT AUF VERLANGEN) nach
              St.Gallen Bahnhof, Lagerstrasse Danach: Shuttlefahrten
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </ContainerCentered>
  </v-container>
</template>

<script setup lang="ts">
import AppTitle from '@/components/app/AppTitle.vue';
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
</script>
