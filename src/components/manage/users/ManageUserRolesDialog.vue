<template>
  <UiDialog v-model="model" :title="t('labels.user')" width="500">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #content>
      <ManageUserRolesForm ref="formRef" v-model="form" />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ t('actions.send') }}
      </VBtnPrimary>
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
import { UiDialog } from '@lib/ui';
import ManageUserRolesForm, {
  DEFAULT_FORM,
  type FormManageUserRoles,
} from './ManageUserRolesForm.vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { clone } from '@/utils/clone.ts';
import useApiUserClaim from '@/api/user-claim.ts';
import type { UserRoles } from '@/api/types/Profile.ts';
import { merge2ObjectsIfKeysExists } from '@/utils/merge.ts';

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits<{
  (event: 'success', eventPayload: { userroles: UserRoles[] }): void;
}>();

const { t } = useI18n();

const form = ref<FormManageUserRoles>({
  ...DEFAULT_FORM,
});

const { setClaim, getClaims } = useApiUserClaim();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    // add
    const { error, data } = await setClaim({
      uid: props.userId,
      claim: 'userroles',
      value: form.value.userroles,
    });

    if (error) {
      if (error.message) {
        toast.error(error.message);
      }
    } else {
      if (data) {
        emit('success', { userroles: [...form.value.userroles] });
        form.value = clone(DEFAULT_FORM);
        toast.success('User ROLES saved!');
        model.value = false;
      }
    }

    isLoading.value = false;
  } else {
    toast.error(t('errors.validation.invalid'));
    isLoading.value = false;
  }
}

const userRoles = ref<UserRoles[]>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getClaims(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      const roles = data.userroles as UserRoles[];
      userRoles.value = roles;
      form.value = merge2ObjectsIfKeysExists(
        { ...DEFAULT_FORM },
        {
          userroles: roles,
        },
      );
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.userId) {
      void onGetDataById(props.userId);
    }
  },
  { immediate: true },
);
</script>
