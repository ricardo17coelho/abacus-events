<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
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
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <EventFilePicker v-model:selected="model.img_url" label="Image URL" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// components
import DialogTitleI18n from '@/components/dialogs/DialogTitleI18n.vue';
// utils
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';
import EventFilePicker from '@/components/event/EventFilePicker.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

const modelValueTitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

defineExpose({ formRef });
</script>
