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
      <v-col>
        <v-text-field
          v-model="model.location"
          :label="t('labels.location_name')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.location_url"
          :label="t('labels.location_url')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-number-input
          v-model="model.total_slots"
          control-variant="stacked"
          inset
          :label="t('labels.slots_total')"
          :min="0"
          :rules="[rulesValidation.ruleRequired]"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-number-input
          v-model="model.filled_slots"
          control-variant="stacked"
          inset
          :label="t('labels.slots_filled')"
          :min="0"
          type="number"
          variant="outlined"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// utils
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
