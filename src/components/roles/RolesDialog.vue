<template>
  <UiDialog
    v-model="model"
    :loading="isLoadingRole"
    max-width="600"
    :title="t('labels.role')"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template v-if="roleId" #content>
      <RolesForm ref="formRef" v-model="form" />
    </template>
    <template v-else #content>
      <v-tabs v-model="currentTab">
        <v-tab value="role-new">New Role</v-tab>
        <v-tab value="role-templates">Templates</v-tab>
      </v-tabs>
      <v-tabs-window v-model="currentTab" class="pt-4">
        <v-tabs-window-item value="role-new">
          <RolesForm ref="formRef" v-model="form" />
        </v-tabs-window-item>
        <v-tabs-window-item value="role-templates">
          <RolesTemplates v-model="currentSelectedTpl" />
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ t('actions.save') }}
      </VBtnPrimary>
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
// components
import { UiDialog } from '@lib/ui';
import RolesForm from './RolesForm.vue';
import RolesTemplates from './RolesTemplates.vue';
// apis
import useApiRole from '@/api/roles.ts';
// composables
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
// types & constants
import type { Role } from '@/api/types/Role.ts';

const props = defineProps({
  roleId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const currentTab = ref<'role-new' | 'role-templates'>('role-new');

const { t, locale } = useI18n();

const DEFAULT_FORM = {
  title: {
    [locale.value]: '',
  },
  permissions: [],
};

const form = ref({
  ...DEFAULT_FORM,
});

const isLoading = ref(false);
const formRef = ref();

const currentSelectedTpl = ref();

watch(
  () => currentTab.value,
  (newValue) => {
    if (newValue) {
      if (newValue !== 'role-templates') {
        currentSelectedTpl.value = undefined;
      }
    }
  },
);

const { createRole, updateRole, getRoleById } = useApiRole();

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
async function onCreatRole(payload: Record<string, any>) {
  const { error, data } = await createRole({
    ...payload,
  });

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      emit('success', data);
      form.value = { ...DEFAULT_FORM };
      model.value = false;
      toast.success('Role added!');
    }
  }
}

async function onSave() {
  if (currentTab.value === 'role-templates') {
    await onCreatRole(currentSelectedTpl.value?.data);
  } else {
    const { valid } = await formRef.value.formRef.validate();
    if (valid) {
      isLoading.value = true;
      if (props.roleId) {
        // edit
        const { error, data } = await updateRole(props.roleId, {
          ...form.value,
        });

        if (error) {
          if (error.message) {
            toast.error(error.message);
          }
        } else {
          if (data) {
            emit('success', data);
            form.value = { ...DEFAULT_FORM };
            model.value = false;
            toast.success('Role updated!');
          }
        }
      } else {
        // add
        await onCreatRole(form.value);
      }
      isLoading.value = false;
    } else {
      toast.error(t('errors.validation.invalid'));
    }
  }
}

const role = ref<Role>();
const isLoadingRole = ref(false);

async function onGetRoleById(roleId: string) {
  isLoadingRole.value = true;
  const { error, data } = await getRoleById(roleId);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      role.value = data;
      form.value = {
        ...DEFAULT_FORM,
        title: data.title,
        permissions: data.permissions,
      };
    }
  }
  isLoadingRole.value = false;
}

watch(
  () => model.value,
  (newValue) => {
    if (newValue && props.roleId) {
      onGetRoleById(props.roleId);
    } else {
      role.value = undefined;
      form.value = {
        ...DEFAULT_FORM,
      };
    }
  },
);
</script>
