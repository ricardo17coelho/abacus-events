<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <ManageUserRolesField
          v-model="model.userroles"
          :label="t('labels.role', 2)"
          multiple
          name="user-roles"
          required
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import type { ProfileWithRoles } from '@/api/types/Profile.ts';

export type FormManageUserRoles = Pick<ProfileWithRoles, 'userroles'>;

export const DEFAULT_FORM: FormManageUserRoles = {
  userroles: [],
};
</script>

<script lang="ts" setup>
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';
import ManageUserRolesField from '@/components/manage/users/ManageUserRolesField.vue';

const model = defineModel({
  type: Object,
  default: () => ({ ...DEFAULT_FORM }),
});

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
