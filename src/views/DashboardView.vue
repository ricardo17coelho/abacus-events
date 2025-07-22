<template>
  <v-container class="pa-0 pa-sm-3" fluid>
    <div class="d-flex justify-space-between align-center flex-wrap ga-4 mb-4">
      <div class="d-flex align-start align-md-center ga-4">
        <UserGreetings />
      </div>
    </div>

    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12" md="4" sm="6">
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

    <v-row v-if="isUserAdmin">
      <v-col align="start" cols="12" lg="4">
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
import useAuthUser from '@/composables/auth-user.ts';

interface CountData {
  events: number;
  users: number;
  parkingLots: number;
}

const { isUserAdmin, isUserAdminOrHelper } = useAuthUser();

const counts: Ref<CountData> = ref({
  events: 0,
  users: 0,
  parkingLots: 0,
});

const items = computed(() =>
  [
    {
      subtitle: 'Total events',
      title: counts.value.events,
      icon: 'mdi-calendar',
      color: 'success',
      to: { name: 'manage-events' },
      show: () => isUserAdmin.value,
    },
    {
      subtitle: 'Total users',
      title: counts.value.users,
      icon: 'mdi-account-group-outline',
      color: 'primary',
      to: { name: 'manage-users' },
      show: () => isUserAdmin.value,
    },
    {
      subtitle: 'Total parking lots',
      title: counts.value.parkingLots,
      icon: 'mdi-car',
      color: 'info',
      to: { name: 'manage-parking-lots' },
      show: () => isUserAdminOrHelper.value,
    },
  ].filter((i) => (typeof i.show === 'function' ? i.show() : true)),
);

const { getEventsCount } = useApiEvents();
const { getProfilesCount } = useApiProfiles();
const { getParkingLotsCount } = useApiParkingLot();

async function fetchData(): Promise<void> {
  const fetchPromises = [];
  const keys: (keyof CountData)[] = [];

  // Parking lots is always fetched
  fetchPromises.push(getParkingLotsCount());
  keys.push('parkingLots');

  if (isUserAdmin.value) {
    fetchPromises.push(getProfilesCount(), getEventsCount());
    keys.push('users', 'events');
  }

  const results = await Promise.allSettled(fetchPromises);

  const updatedCounts: Partial<CountData> = { ...counts.value };

  results.forEach((result, index) => {
    const key = keys[index];
    if (result.status === 'fulfilled') {
      updatedCounts[key] = result.value?.count ?? 0;
    } else {
      updatedCounts[key] = 0;
    }
  });

  counts.value = {
    events: updatedCounts.events ?? 0,
    users: updatedCounts.users ?? 0,
    parkingLots: updatedCounts.parkingLots ?? 0,
  };
}

fetchData();
</script>
