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
        <DialogTitleI18n :i18n="model.title" @save="model.title = $event">
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :label="t('labels.title')"
              :model-value="modelValueTitleI18n"
              readonly
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <DialogTitleI18n :i18n="model.message" @save="model.message = $event">
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :label="t('labels.message')"
              :model-value="modelValueMessageI18n"
              readonly
              :rules="[rulesValidation.ruleRequired]"
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
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
import DialogTitleI18n from '@/components/dialogs/DialogTitleI18n.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import FieldIconMdi from '@/components/fields/FieldIconMdi.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

const modelValueTitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

const modelValueMessageI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.message),
);

defineExpose({ formRef });
</script>
