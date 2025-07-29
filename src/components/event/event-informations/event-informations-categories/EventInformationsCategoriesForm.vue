<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <FieldTextTitleI8n
          v-model="model.title"
          :label="t('labels.name')"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <FieldColorPicker v-model="model.color" />
      </v-col>
      <v-col cols="12" sm="6">
        <FieldIconMdi v-model="model.icon" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// components
import FieldIconMdi from '@/components/fields/FieldIconMdi.vue';
// utils
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';
import FieldColorPicker from '@/components/fields/FieldColorPicker.vue';
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
