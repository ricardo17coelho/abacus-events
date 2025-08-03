<template>
  <Page class="h-100 d-flex flex-column">
    <PageHeading title="Users" />
    <PageContent class="flex-1-0 wrapper-flex-1-1-0">
      <UiTable
        :actions="actions"
        class="h-100"
        fixed-header
        :headers="headers"
        :items="users"
        items-per-page="100"
        subtitle="A list of all users."
        title="Users"
      >
        <template #[`item.user`]="{ item }">
          <UiAvatar
            class="border-solid mr-2"
            :logo="item.avatar_url"
            :logo-alt="`logo-url-${item.name}`"
            :name="getUserFullName(item)"
          />
          {{ getUserFullName(item) }}
        </template>
        <template #[`item.userroles`]="{ item }">
          <v-chip
            v-for="userrole in item.userroles"
            :key="`${item.id}-${userrole}`"
            :color="getRoleColor(userrole)"
            density="compact"
            :prepend-icon="getRoleIcon(userrole)"
          >
            {{ userrole }}
          </v-chip>
        </template>
      </UiTable>
      <ManageUserRolesDialog
        v-if="currentUserId"
        :model-value="currentUserId !== undefined"
        :user-id="currentUserId"
        @success="onSave"
        @update:model-value="currentUserId = undefined"
      />
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page';
import { useI18n } from 'vue-i18n';
import { type MenuItem, UiAvatar, UiTable, useMenuActions } from '@lib/ui';
import { toast } from 'vue-sonner';
import type { ProfileWithRoles } from '@/api/types/Profile.ts';
import useApiProfiles from '@/api/profiles.ts';
import { getUserFullName } from '@/utils/profile.ts';
import ManageUserRolesDialog from '@/components/manage/users/ManageUserRolesDialog.vue';
import type { EventPerson } from '@/api/types/EventPerson.ts';
import useManageUserRoles from '@/components/manage/users/manage-user-roles.ts';

const { t } = useI18n();

const headers = ref([
  { title: t('labels.user'), key: 'user' },
  { title: t('labels.role', 2), key: 'userroles' },
]);

const users = ref<ProfileWithRoles[]>([]);

const { getProfiles } = useApiProfiles();

const fetchData = async () => {
  const { data, error } = await getProfiles();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    users.value = data;
  }
};
fetchData();

const { getRoleColor, getRoleIcon } = useManageUserRoles();

const currentUserId = ref();

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    action: (item: EventPerson) => {
      currentUserId.value = item.id;
    },
  },
]);

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function onSave(payload: any) {
  console.warn('payload', payload);
  if (!users.value) return;

  const idx = users.value.findIndex((i) => i.id === payload.id);

  if (idx > -1) {
    users.value[idx] = {
      ...users.value[idx],
      userroles: payload,
    };
  }
}
</script>

<style lang="scss" scoped>
.wrapper-flex-1-1-0 :deep(.v-table__wrapper) {
  flex: 1 1 0;
}
</style>
