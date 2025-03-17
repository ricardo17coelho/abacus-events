<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.email"
          :label="t('labels.email')"
          name="email"
          required
          :rules="[rulesValidation.ruleRequired, rulesValidation.ruleEmail]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <RolesFieldSelect
          v-model="model.roleId"
          required
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea v-model="model.message" :label="t('labels.message')" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// components
import RolesFieldSelect from '@/components/roles/RolesFieldSelect.vue';
// utils
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
