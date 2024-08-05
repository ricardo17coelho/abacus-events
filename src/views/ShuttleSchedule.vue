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
          density="compact"
        >
          <div>Zwischen 19.00 - 21.30 Uhr verkehrt KEIN Shuttlebus</div>
          <div>
            bitte auf ÖV (<a class="link-external" href="https://www.sbb.ch/">
              SBB
            </a>
            - Haltestelle Sonnrainweg) ausweichen!
          </div>
        </v-alert>
        <v-alert class="my-6" border="start" rounded="lg" density="compact">
          <v-icon>mdi-information-variant-circle-outline</v-icon>
          VBSG-Bus ist mit EXTRAFAHRT beschriftet
        </v-alert>
        <v-card class="my-6">
          <template #title>
            <v-icon color="primary" size="x-small">mdi-bus-clock</v-icon>
            Hinfahrt
          </template>
          <template #subtitle>
            <div class="text-wrap">13:30-19:00 Uhr (im 30min Takt)</div>
          </template>
          <v-card-item>
            <v-timeline
              align="start"
              size="x-small"
              side="end"
              truncate-line="both"
              dot-color="primary"
              density="compact"
            >
              <v-timeline-item
                v-for="(item, idx) in itemsOutward"
                :key="`${idx}-outward`"
                icon="mdi-arrow-down"
              >
                <div>
                  <div>
                    <a class="link-external" :href="item.link" target="_blank">
                      {{ item.text }}
                    </a>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-item>
        </v-card>

        <v-card class="my-6">
          <template #title>
            <v-icon color="primary" size="x-small">mdi-bus-clock</v-icon>
            Rückfahrt
          </template>
          <template #subtitle>
            <div class="text-wrap">21:30-01:30 Uhr (im 30min Takt)</div>
          </template>

          <v-card-item>
            <v-timeline
              align="start"
              size="x-small"
              side="end"
              truncate-line="both"
              dot-color="primary"
              density="compact"
            >
              <v-timeline-item
                v-for="(item, idx) in itemsReturn"
                :key="`${idx}-return`"
                icon="mdi-arrow-down"
              >
                <div>
                  <div>
                    <a class="link-external" :href="item.link" target="_blank">
                      {{ item.text }}
                    </a>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-item>
        </v-card>
      </v-card>
    </ContainerCentered>
  </v-container>
</template>

<script setup lang="ts">
import AppTitle from '@/components/app/AppTitle.vue';
import ContainerCentered from '@/components/containers/ContainerCentered.vue';

const itemsOutward = computed(() => [
  {
    text: 'Hauptbahnhof St. Gallen- Lagerstrasse, 9000 St. Gallen',
    link: 'https://maps.app.goo.gl/uWM6UuKsAZzeYGnJA'
  },
  {
    text: 'Hodlertrasse, 9008 St. Gallen (St. Fiden PP)',
    link: 'https://maps.app.goo.gl/cbYMd9uyUQYjAQBSA'
  },
  {
    text: 'Abacus, Wittenbach',
    link: 'https://maps.app.goo.gl/132fBr3KKb8cczPWA'
  }
]);

const itemsReturn = computed(() => [
  {
    text: 'Abacus, Wittenbach',
    link: 'https://maps.app.goo.gl/132fBr3KKb8cczPWA'
  },
  {
    text: 'Hodlertrasse, 9008 St. Gallen (St. Fiden PP)',
    link: 'https://maps.app.goo.gl/cbYMd9uyUQYjAQBSA'
  },
  {
    text: 'Radisson (Halt auf Verlangen)',
    link: 'https://maps.app.goo.gl/DorgNiRHPizxKwnU7'
  },
  {
    text: 'Hauptbahnhof St. Gallen- Lagerstrasse, 9000 St. Gallen',
    link: 'https://maps.app.goo.gl/uWM6UuKsAZzeYGnJA'
  }
]);
</script>
