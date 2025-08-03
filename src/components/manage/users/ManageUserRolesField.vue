<template>
  <v-select
    v-model="model"
    :items="items"
    :label="t('event.feature')"
    name="field-event-feature-type"
    v-bind="$attrs"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip
        v-if="index < 2"
        :color="getRoleColor(item.value)"
        density="compact"
        :prepend-icon="getRoleIcon(item.value)"
        :text="item.title"
      />

      <span
        v-if="Array.isArray(model) && index === 2"
        class="text-grey text-caption align-self-center"
      >
        (+{{ model.length - 2 }} others)
      </span>
    </template>
  </v-select>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { USER_ROLE } from '@/api/types/Profile.ts';
import useManageUserRoles from '@/components/manage/users/manage-user-roles.ts';

const model = defineModel();

const { t } = useI18n();

const { getRoleColor, getRoleIcon } = useManageUserRoles();

const items = computed(() =>
  Object.values(USER_ROLE).map((i) => {
    return {
      value: i,
      title: t(`labels.roles.${i}`),
      props: {
        slim: true,
        prependIcon: getRoleIcon(i),
        color: 'primary',
      },
    };
  }),
);
</script>
