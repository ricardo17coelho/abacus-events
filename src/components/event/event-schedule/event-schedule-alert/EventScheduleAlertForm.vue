<template>
  <v-form ref="formRef"
    ><v-row dense>
      <v-col>
        <v-radio-group v-model="model.type">
          <v-radio color="success" label="success" value="success"></v-radio>
          <v-radio color="info" label="info" value="info"></v-radio>
          <v-radio color="warning" label="warning" value="warning"></v-radio>
          <v-radio color="error" label="error" value="error"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <FieldTextTitleI8n v-model="model.title" :label="t('labels.title')" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <UiHtmlEditorI18n
          v-model="model.message"
          :available-locales="availableLocales"
          :label="t('labels.message')"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <FieldIconMdi v-model="model.icon" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// utils
import { useI18n } from 'vue-i18n';
import rulesValidation from '@/utils/validations';
import FieldIconMdi from '@/components/fields/FieldIconMdi.vue';
import { UiHtmlEditorI18n } from '@lib/ui';
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t, availableLocales } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
