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
      <v-col>
        <FieldTextTitleI8n v-model="model.description" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <EventFeatureTypeField
          v-model="model.feature_id"
          chips
          :disabled-features-types="disabledFeaturesTypes"
          :label="t('labels.feature')"
          name="field-feature"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <FieldIconMdi v-model="model.icon" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-switch v-model="model.enabled" :label="t('labels.enabled')" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// utils
import rulesValidation from '@/utils/validations';
import EventFeatureTypeField from '@/components/event/event-feature/EventFeatureTypeField.vue';
import { useI18n } from 'vue-i18n';
import FieldIconMdi from '@/components/fields/FieldIconMdi.vue';
import type { EventFeatureTypes } from '@/api/types/EventFeature.ts';
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';

defineProps({
  disabledFeaturesTypes: {
    type: Array as PropType<EventFeatureTypes[]>,
    default: () => [],
  },
});

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
