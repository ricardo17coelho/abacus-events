<template>
  <v-container fluid>
    <div class="d-flex justify-space-between align-center flex-wrap ga-4 mb-4">
      <div class="d-flex align-start align-md-center ga-4">
        <UserGreetings />
      </div>
    </div>

    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12" md="3" sm="6">
        <v-card class="pa-2" exact :to="item.to">
          <v-card-item class="pt-4" height="64">
            <v-card-subtitle class="py-0">{{ item.subtitle }}</v-card-subtitle>

            <v-card-title class="text-h5 py-0">{{ item.title }}</v-card-title>

            <template #append>
              <v-icon
                class="opacity-20"
                :color="item.color"
                :icon="item.icon"
                size="48"
              />
            </template>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="start" cols="12" md="4">
        <WidgetEvents />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import WidgetEvents from '@/components/manage/widgets/WidgetEvents.vue';
import UserGreetings from '@/components/UserGreetings.vue';
import useApiEvents from '@/api/events.ts';
import useApiParkingLot from '@/api/parking-lots.ts';
import useApiProfiles from '@/api/profiles.ts';
const counts = ref({
  events: 0,
  users: 0,
  parkingLots: 0,
});

const items = computed(() => [
  {
    subtitle: 'Total events',
    title: counts.value.events,
    icon: 'mdi-calendar',
    color: 'success',
    to: {
      name: 'manage-events',
    },
  },
  {
    subtitle: 'Total users',
    title: counts.value.users,
    icon: 'mdi-account-group-outline',
    color: 'primary',
    to: {
      name: 'manage-users',
    },
  },

  {
    subtitle: 'Total parking lots',
    title: counts.value.parkingLots,
    icon: 'mdi-car',
    color: 'info',
    to: {
      name: 'manage-parking-lots',
    },
  },
]);

const { getEventsCount } = useApiEvents();
const { getProfilesCount } = useApiProfiles();
const { getParkingLotsCount } = useApiParkingLot();

async function fetchData() {
  const apis = [getEventsCount(), getProfilesCount(), getParkingLotsCount()];

  const results = await Promise.allSettled(apis);

  counts.value = {
    events: results[0].status === 'fulfilled' ? results[0].value.count || 0 : 0,
    users: results[1].status === 'fulfilled' ? results[1].value.count || 0 : 0,
    parkingLots:
      results[2].status === 'fulfilled' ? results[2].value.count || 0 : 0,
  };
}
fetchData();
</script>
