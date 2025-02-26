<template>
  <v-text-field
    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :hint="t('fields.password.hint')"
    :label="t('fields.password.label')"
    name="field-password"
    :rules="[
      rulesValidation.ruleRequired,
      (v) => rulesValidation.ruleMinLength(v, { length: 8 }),
    ]"
    :type="show ? 'text' : 'password'"
    v-bind="$attrs"
    @click:append-inner="show = !show"
  />
</template>

<script setup lang="ts">
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const show = ref(false);
</script>
