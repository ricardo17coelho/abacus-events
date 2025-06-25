<template>
  <v-row justify="center">
    <v-col v-for="contact in contacts" :key="contact.id" cols="12" sm="6">
      <v-list-item
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
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { EventContact } from '@/api/types/EventContact.ts';
import useContact from '@/composables/contact.ts';

defineProps({
  contacts: {
    type: Array as PropType<EventContact[]>,
    default: () => [],
  },
});

const { getContactHREF, getContactIcon } = useContact();
</script>
