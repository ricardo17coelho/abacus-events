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
          <div>Zwischen 19.00 - 21.30 Uhr verkehrt KEIN Shuttlebus</div>
          <div>
            bitte auf ÖV (<a href="https://www.sbb.ch/">SBB</a> - Haltestelle
            Sonnrainweg) ausweichen!
          </div>
        </v-alert>
        <v-card class="my-6" title="Hinfahrt">
          <template #subtitle>
            <div class="text-wrap">
              13:30-19:00 Uhr (im 30min Takt) - VBSG-Bus ist mit EXTRAFAHRT
              beschriftet
            </div>
          </template>
          <v-card-text>
            Ab
            <a
              href="https://www.google.com/maps/place/Taxistandplatz+Bahnhof+Nord/@47.4224396,9.3668047,60m/data=!3m1!1e3!4m6!3m5!1s0x479b1f308968ad5b:0x4a1a51f355bd2c7b!8m2!3d47.4224759!4d9.3669746!16s%2Fg%2F11h7qxzv95?entry=ttu"
              >Hauptbahnhof St. Gallen- Lagerstrasse, 9000 St. Gallen</a
            >
            - via
            <a
              href="https://www.google.com/maps/place/Hodlerstrasse/@47.4372667,9.3951779,239m/data=!3m1!1e3!4m15!1m8!3m7!1s0x479b1e60822ceafd:0xef48c2823e34a8bb!2sHodlerstrasse,+9008+St.+Gallen!3b1!8m2!3d47.4378965!4d9.3944292!16s%2Fg%2F1tf30c8f!3m5!1s0x479b1e5fcdf569cb:0x72208b43206f7579!8m2!3d47.437128!4d9.394847!16s%2Fg%2F11gxvtv6dk?entry=ttu"
            >
              Hodlertrasse, 9008 St. Gallen
            </a>
            (St. Fiden PP) nach Abacus, Wittenbach
          </v-card-text>
        </v-card>

        <v-card class="my-6" title="Rücktransport">
          <template #subtitle>
            21:30-01:30 Uhr (im 30min Takt) - VBSG-Bus ist mit EXTRAFAHRT
            beschriftet
          </template>
          <v-card-text>
            <div>
              Ab Abacus, Wittenbach - via
              <a
                href="https://www.google.com/maps/place/Hodlerstrasse/@47.4372667,9.3951779,239m/data=!3m1!1e3!4m15!1m8!3m7!1s0x479b1e60822ceafd:0xef48c2823e34a8bb!2sHodlerstrasse,+9008+St.+Gallen!3b1!8m2!3d47.4378965!4d9.3944292!16s%2Fg%2F1tf30c8f!3m5!1s0x479b1e5fcdf569cb:0x72208b43206f7579!8m2!3d47.437128!4d9.394847!16s%2Fg%2F11gxvtv6dk?entry=ttu"
              >
                Hodlertrasse, 9008 St. Gallen
              </a>

              (St. Fiden PP) -
              <a
                href="https://www.google.com/maps/place/Radisson+Blu+Hotel,+St.+Gallen/@47.4310647,9.3754605,805m/data=!3m1!1e3!4m20!1m10!3m9!1s0x479b1e450661dbad:0x1887a17ec9c6e60f!2sRadisson+Blu+Hotel,+St.+Gallen!5m2!4m1!1i2!8m2!3d47.4310612!4d9.380326!16s%2Fg%2F11bbrn0pwy!3m8!1s0x479b1e450661dbad:0x1887a17ec9c6e60f!5m2!4m1!1i2!8m2!3d47.4310612!4d9.380326!16s%2Fg%2F11bbrn0pwy?entry=ttu"
              >
                Hotel Radisson (HALT AUF VERLANGEN!)
              </a>

              -
              <a
                href="https://www.google.com/maps/place/Taxistandplatz+Bahnhof+Nord/@47.4224396,9.3668047,60m/data=!3m1!1e3!4m6!3m5!1s0x479b1f308968ad5b:0x4a1a51f355bd2c7b!8m2!3d47.4224759!4d9.3669746!16s%2Fg%2F11h7qxzv95?entry=ttu"
                >Hauptbahnhof St. Gallen- Lagerstrasse, 9000 St. Gallen</a
              >
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
