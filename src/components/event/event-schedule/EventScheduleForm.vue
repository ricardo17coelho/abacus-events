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
            >
              <template #append-inner>
                <UiInfoHint
                  text="The title of the schedule. Should be entered in all available languages"
                />
              </template>
            </v-text-field>
          </template>
        </DialogTitleI18n>
      </v-col>
    </v-row>
    <v-row dense>
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
              :rules="[rulesValidation.ruleRequired]"
              v-bind="activatorProps"
            >
              <template #append-inner>
                <UiInfoHint
                  text="The description of the schedule. Should be entered in all available languages"
                />
              </template>
            </v-text-field>
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
import UiInfoHint from '@lib/ui/components/UiInfoHint.vue';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import FieldIconMdi from '@/components/fields/FieldIconMdi.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const modelValueTitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

const modelValueDescriptionI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.description),
);

const formRef = ref();

defineExpose({ formRef });
</script>
