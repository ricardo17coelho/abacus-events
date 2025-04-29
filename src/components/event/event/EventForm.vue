<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col cols="12">
        <DialogTitleI18n :i18n="model.title" @save="model.title = $event">
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :label="t('labels.name')"
              :model-value="modelValueTitleI18n"
              readonly
              :rules="[rulesValidation.ruleRequired]"
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
      <v-col cols="12">
        <DialogTitleI18n
          :i18n="model.description"
          @save="model.description = $event"
        >
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :label="t('labels.description')"
              :model-value="modelValueDescriptionI18n"
              readonly
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field v-model="model.slug" :label="t('labels.slug')" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-date-input
          v-model="model.date"
          display-format="keyboardDate"
          :label="t('labels.date')"
          :min="today"
        ></v-date-input>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-switch v-model="model.public" :label="t('labels.public')" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import DialogTitleI18n from '@/components/dialogs/DialogTitleI18n.vue';
// utils
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const today = new Date();

const formRef = ref();

const modelValueTitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

const modelValueDescriptionI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.description),
);

defineExpose({ formRef });
</script>
