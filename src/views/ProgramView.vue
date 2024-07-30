<template>
  <v-container class="align-center">
    <v-row>
      <v-col align="center">
        <AppTitle :title="$t('title.program')" />
      </v-col>
    </v-row>
    <v-timeline align="start" side="end">
      <v-timeline-item
        v-for="item in items"
        :key="item.title"
        dot-color="primary"
        :icon="item.icon"
        :size="$vuetify.display.mdAndUp ? 'x-large' : undefined"
      >
        <div class="d-flex" :class="{ 'flex-column': $vuetify.display.xs }">
          <span class="me-4">{{ `${item.timeStart}-${item.timeEnd}` }}</span>
          <div>
            <div>
              <strong>{{ item.title }}</strong>
            </div>
            <div>
              <v-chip
                v-for="location in item.locations"
                :key="`${item.title}-${location}`"
                size="small"
                class="mr-1"
                color="primary"
                variant="tonal"
                prepend-icon="mdi-home-map-marker"
              >
                {{ location }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script setup lang="ts">
import AppTitle from '@/components/app/AppTitle.vue';

const items = computed(() => [
  {
    title: 'AbaBand',
    locations: ['Festzelt'],
    timeStart: '15.00',
    timeEnd: '16.00',
    icon: 'mdi-music'
  },
  {
    title: 'Unplugged-Group',
    locations: ['Festzelt'],
    timeStart: '17.30',
    timeEnd: '18.00',
    icon: 'mdi-music'
  },
  {
    title: 'Speech',
    locations: ['Festzelt (AbaHome 2 if it rains)'],
    note: 'Livebrodcast to Auditorium, AbaHome 2, Kurraum',
    timeStart: '18.00',
    timeEnd: '18.30',
    icon: 'mdi-microphone-variant'
  },
  {
    title: 'Catalyst',
    locations: ['Festzelt'],
    note: 'Unplugged-Group Abacus-Campus',
    timeStart: '18.30',
    timeEnd: '19.30',
    icon: 'mdi-music'
  },
  {
    title: 'Unplugged-Group',
    locations: ['Festzelt'],
    note: 'Announcement Justina',
    timeStart: '19.30',
    timeEnd: '20.00',
    icon: 'mdi-music'
  },
  {
    title: 'Justina Lee Brown',
    locations: ['Festzelt'],
    timeStart: '20.00',
    timeEnd: '21.00',
    icon: 'mdi-music'
  },
  {
    title: 'Karaoke',
    locations: ['AbaHome 2', 'MA-Bar'],
    timeStart: '21.00',
    timeEnd: '01.00',
    icon: 'mdi-music'
  },
  {
    title: 'Silint Disco',
    locations: ['AbaHome 2', 'EG'],
    note: 'DJ in the Al Covo',
    timeStart: '21.00',
    timeEnd: '01.00',
    icon: 'mdi-music-circle'
  }
]);
</script>
