<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <v-text-field v-model="model.text" :label="t('labels.text_name')" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.text_link"
          :label="t('labels.text_link')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <FieldTextTitleI8n
          v-model="model.description"
          :label="t('labels.description')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field v-model="model.order" :label="t('labels.order')" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// utils
import { useI18n } from 'vue-i18n';
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
