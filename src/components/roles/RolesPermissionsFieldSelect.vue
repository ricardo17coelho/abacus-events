<template>
  <v-autocomplete
    v-model="model"
    clearable
    :items="items"
    :label="t('labels.permission')"
  >
    <template #selection="{ item, index }">
      <v-chip v-if="index < 2">
        <span>{{ item.title }}</span>
      </v-chip>
      <span v-if="index === 2" class="text-grey text-caption align-self-center">
        (+{{ model.length - 2 }} others)
      </span>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
// types & constants
import { PERMISSIONS } from '@/api/types/Permissions.ts';
// utils
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: [Array, String], default: undefined });

const { t } = useI18n();

const permissions = computed(() => Object.values(PERMISSIONS));

const items = computed(() =>
  permissions.value.map((i) => {
    return {
      value: i,
      title: t(`permissions.types.${i}`),
    };
  }),
);
</script>
