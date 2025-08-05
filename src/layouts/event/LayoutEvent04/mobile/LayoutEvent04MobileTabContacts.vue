<template>
  <v-container
    v-if="currentEvent && feature && currentEvent.files.length"
    class="pa-0"
  >
    <v-list>
      <v-list-item
        v-for="contact in currentEvent.contacts"
        :key="contact.id"
        class="px-0"
        density="compact"
        :href="getContactHREF(contact)"
        :subtitle="contact.value"
        :title="contact.description"
      >
        <template #prepend>
          <v-avatar color="surface-light" :size="48">
            <v-icon color="primary">
              {{ getContactIcon(contact.type) }}
            </v-icon>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { getEventFeatureIfExists } from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import useContact from '@/composables/contact.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const feature = computed(() =>
  currentEvent.value
    ? getEventFeatureIfExists(currentEvent.value, 'CONTACTS')
    : undefined,
);

const { getContactHREF, getContactIcon } = useContact();
</script>
