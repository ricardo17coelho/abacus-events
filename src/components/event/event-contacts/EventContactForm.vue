<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <EventContactTypeField
          v-model="model.type"
          required
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.value"
          :label="t('labels.value')"
          name="value"
          required
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.description"
          :label="t('labels.description')"
          name="description"
          required
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// components
import EventContactTypeField from '@/components/event/event-contacts/EventContactTypeField.vue';
// utils
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
