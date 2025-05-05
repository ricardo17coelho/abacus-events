<template>
  <v-row>
    <v-col v-for="contact in contacts" :key="contact.id" cols="12" lg="6">
      <div>
        {{ contact.description }}
        <a v-if="contact.type === 'PHONE'" :href="`tel:${contact.value}`">
          <v-icon>{{ getEventContactIcon(contact.type) }}</v-icon>
          {{ contact.value }}
        </a>
        <a v-if="contact.type === 'EMAIL'" :href="`mailto:${contact.value}`">
          <v-icon>{{ getEventContactIcon(contact.type) }}</v-icon>
          {{ contact.value }}
        </a>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { getEventContactIcon } from '@/components/event/event-contacts/event-contacts.ts';
import type { EventContact } from '@/api/types/EventContact.ts';

defineProps({
  contacts: {
    type: Array as PropType<EventContact[]>,
    default: () => [],
  },
});
</script>
