<template>
  <Page class="h-100 d-flex flex-column">
    <PageHeading title="Roles" />
    <PageContent class="flex-1-0 wrapper-flex-1-1-0">
      <UiTable
        :actions="actions"
        class="h-100"
        fixed-header
        :headers="headers"
        :items="items"
        :loading="isLoading"
        subtitle="A list of all roles."
        title="Roles"
      >
        <template #toolbar-actions>
          <RolesDialog
            v-model="showDialog"
            :role-id="currentRoleId"
            @success="onSaveSuccess"
          >
            <template #activator="{ props: ActivatorProps }">
              <VBtnPrimary color="primary" v-bind="ActivatorProps">
                New Role
              </VBtnPrimary>
            </template>
          </RolesDialog>
        </template>
        <template #[`item.title`]="{ item }">
          {{ showDefaultTranslationOrEmpty(item.title) }}
        </template>
        <template #[`item.permissions`]="{ item }">
          <div>{{ item.permissions.length }}</div>
        </template>
      </UiTable>
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page';
import { type MenuItem, UiTable, useMenuActions } from '@lib/ui';
// components
import RolesDialog from '@/components/roles/RolesDialog.vue';
// composables
import { toast } from 'vue-sonner';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import useApiRole from '@/api/roles.ts';
import type { Role } from '@/api/types/Role.ts';

const items = ref<Role[]>([]);

const showDialog = ref(false);

const { getRoles, removeRole } = useApiRole();

const isLoading = ref(false);
async function fetchAll() {
  isLoading.value = true;
  const { data, error } = await getRoles();

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      items.value = data;
    }
  }

  isLoading.value = false;
}

fetchAll();

async function onRemove(id: string) {
  const { error } = await removeRole(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    const idx = items.value.findIndex((r) => r.id === id);
    if (idx > -1) {
      items.value.splice(idx, 1);
    }
  }
}

const headers = ref([
  { title: 'Title', key: 'title', sortable: false },
  { title: 'Permissions', key: 'permissions', sortable: false },
]);

const currentRoleId = ref();

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.edit,
    show: () => true,
    action: (role: Role) => {
      currentRoleId.value = role.id;
      showDialog.value = true;
    },
  },
  {
    ...menuGlobalActions.value.delete,
    show: () => true,
    action: (role: Role) => onRemove(role.id),
  },
]);

watch(
  () => showDialog.value,
  (newValue) => {
    if (!newValue) {
      currentRoleId.value = undefined;
    }
  },
);

function onSaveSuccess(role: Role) {
  const roleIdx = items.value.findIndex((r) => r.id === role.id);
  if (roleIdx > -1) {
    Object.assign(items.value[roleIdx], role);
  } else {
    items.value.push(role);
  }
}
</script>
