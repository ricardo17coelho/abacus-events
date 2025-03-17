<template>
  <v-select
    chips
    :items="rolesItems"
    :label="t('labels.role')"
    name="field-ole"
    v-bind="$attrs"
  >
  </v-select>
</template>

<script lang="ts" setup>
import type { Role } from '@/api/types/Role.ts';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import useApiRole from '@/api/roles.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';

const { t } = useI18n();

const roles = ref<Role[]>([]);

const { getRoles } = useApiRole();

async function onGetRoles() {
  const { data, error } = await getRoles();

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      roles.value = data;
    }
  }
}
onGetRoles();

const rolesItems = computed(() =>
  roles.value.map((role) => {
    return {
      value: role.id,
      title: showDefaultTranslationOrEmpty(role.title),
    };
  }),
);
</script>
