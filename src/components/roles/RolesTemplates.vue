<template>
  <FieldTemplatesSelect v-model="model" :items="items" />
</template>

<script setup lang="ts">
// components
import FieldTemplatesSelect from '@/components/fields/FieldTemplatesSelect.vue';
// types & constants
import { PERMISSIONS } from '@/api/types/Permissions.ts';

const model = defineModel({ type: Object, default: () => ({}) });

const items = computed(() => [
  {
    id: 'owner',
    title: 'Owner',
    description:
      'The owner of the event can manage everything related to the event',
    icon: 'mdi-office-building',
    data: {
      title: {
        en: 'Owner of the event',
        pt: 'Owner of event',
      },
      permissions: Object.keys(PERMISSIONS).filter((permission) =>
        permission.includes('MNG'),
      ),
    },
  },
]);
</script>
