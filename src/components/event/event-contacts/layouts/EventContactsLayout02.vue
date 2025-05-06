<template>
  <v-list>
    <v-list-item
      v-for="contact in contacts"
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
            {{ getEventContactIcon(contact.type) }}
          </v-icon>
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
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

function getContactHREF(contact: EventContact) {
  if (contact.type === 'PHONE') {
    return `tel:${contact.value}`;
  } else if (contact.type === 'EMAIL') {
    return `mailto:${contact.value}`;
  }
}
</script>
