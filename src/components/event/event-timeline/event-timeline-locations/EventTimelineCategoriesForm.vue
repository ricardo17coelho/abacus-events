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
      <v-col cols="12">
        <EventFilePicker v-model:selected="model.img_url" label="Image URL" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';
import EventFilePicker from '@/components/event/EventFilePicker.vue';
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
