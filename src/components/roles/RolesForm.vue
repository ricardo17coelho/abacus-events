<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <FieldTextTitleI8n
          v-model="model.title"
          :label="t('labels.title')"
          name="field-description"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>

    <v-divider class="ma-6" inset></v-divider>

    <v-row dense>
      <v-col>
        <RolesPermissionsFieldSelect
          v-model="model.permissions"
          multiple
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// components
import RolesPermissionsFieldSelect from './RolesPermissionsFieldSelect.vue';
// utils
import rulesValidation from '@/utils/validations';
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const model = defineModel({ type: Object, default: () => ({}) });

const formRef = ref();

defineExpose({ formRef });
</script>
