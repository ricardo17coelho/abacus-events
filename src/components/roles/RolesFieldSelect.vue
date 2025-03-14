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
import type { TitleI18n } from '@/types/TitleI18n.ts';
import useApiRole from '@/api/roles.ts';

const { locale, fallbackLocale, t } = useI18n();

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

function roleI18nHasLocale(role: TitleI18n, localeValue: string) {
  return role?.i18n && Object.keys(role.i18n).includes(localeValue);
}

const rolesItems = computed(() =>
  roles.value.map((role) => {
    return {
      value: role.id,
      title: roleI18nHasLocale(role, locale.value)
        ? role.i18n[locale.value]
        : roleI18nHasLocale(role, fallbackLocale.value as string)
          ? role.i18n[fallbackLocale.value as string]
          : '',
    };
  }),
);
</script>
