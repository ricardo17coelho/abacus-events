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
      <v-col>
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
        <EventFeatureTypeField
          v-model="model.feature_id"
          chips
          :label="t('labels.feature')"
          name="field-feature"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="model.icon"
          hint="An icon from MDI"
          :label="t('labels.icon')"
        />
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
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import rulesValidation from '@/utils/validations';
import DialogTitleI18n from '@/components/dialogs/DialogTitleI18n.vue';
import EventFeatureTypeField from '@/components/event/event-feature/EventFeatureTypeField.vue';
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

const modelValueTitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

const modelValueDescriptionI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.description),
);

defineExpose({ formRef });
</script>
