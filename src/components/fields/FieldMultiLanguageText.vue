<template>
  <div>
    <VBtnSecondary
      v-if="Object.keys(model).length === 0"
      @click="onAddLanguageField"
    >
      <v-icon start> mdi-plus </v-icon>
      {{ btnAdd || t('actions.add') }}
    </VBtnSecondary>
    <template v-else>
      <v-row v-for="(_, modelKey) in model" :key="modelKey" dense>
        <v-col cols="4">
          <v-select
            :items="getLangItemsByLang(modelKey)"
            :label="
              fieldKeyLabel || t('fields.multi_language_text.field_key_label')
            "
            :model-value="modelKey"
            :name="`field-multi-language-key-${modelKey}`"
            @update:model-value="onModelKeyInput($event, modelKey)"
          >
            <template #item="{ props: ItemProps, item }">
              <v-list-item v-bind="ItemProps">
                <template #title>
                  <span v-if="xs">{{ item.value }}</span>
                  <span v-else>{{ item.title }}</span>
                </template>
              </v-list-item>
            </template>
            <template #selection="{ item }">
              <span v-if="xs">{{ item.value }}</span>
              <span v-else>{{ item.title }}</span>
            </template>
          </v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="model[modelKey]"
            autocomplete="off"
            autofocus
            clearable
            :label="
              fieldValueLabel ||
              t('fields.multi_language_text.field_value_label')
            "
            :name="`field-multi-language-value-${modelKey}`"
            :rules="[validationsRules.ruleRequired]"
          >
            <template #append>
              <v-btn
                class="mt-1"
                color="error"
                icon="mdi-delete"
                size="small"
                variant="text"
                @click="onRemoveLanguageFieldByLangKey(modelKey)"
              />
            </template>
          </v-text-field>
        </v-col>
        <v-col align-self="start" cols="12">
          <v-btn
            v-if="showBtnAddByIndex(modelKey)"
            class="mt-1"
            @click="onAddLanguageField"
          >
            <v-icon start> mdi-plus </v-icon>
            {{ btnAdd || t('actions.add') }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import validationsRules from '@/utils/validations/';
import { useDisplay } from 'vuetify';

defineProps({
  btnAdd: {
    type: String,
    default: undefined,
  },
  fieldKeyLabel: {
    type: String,
    default: undefined,
  },
  fieldValueLabel: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Object, default: () => ({}) });

const { t, availableLocales } = useI18n();
const { xs } = useDisplay();

const computedAvailableLanguages = computed(() =>
  availableLocales.map((l) => l.split('-')[0]),
);

const sortedAvailableLanguages = computed((): string[] => {
  const usedLanguages = Object.keys(model.value).map((lang) => lang);
  // remove null or undefined
  usedLanguages.filter((lang: string) => lang);
  return [...computedAvailableLanguages.value].filter(
    (lang: string) => !usedLanguages.includes(lang),
  );
});

function onModelKeyInput(newKey: string, oldKey: string) {
  const newModel = { ...model.value, [newKey]: model.value[oldKey] };
  delete newModel[oldKey];
  model.value = newModel;
}

function showBtnAddByIndex(langKey: string) {
  const keys = Object.keys(model.value);
  const keyIdx = keys.findIndex((key) => key === langKey);
  return (
    keyIdx + 1 >= keys.length &&
    keys.length !== computedAvailableLanguages.value.length
  );
}

function onAddLanguageField() {
  model.value = {
    ...model.value,
    [sortedAvailableLanguages.value[0]]: null,
  };
}

function onRemoveLanguageFieldByLangKey(langKey: string) {
  const modelValue = { ...model.value };
  delete modelValue[langKey];
  model.value = modelValue;
}

function getLangItemsByLang(langKey: string) {
  // filter to remove null or undefined
  const usedLanguages = Object.keys(model.value)
    .map((lang) => lang)
    .filter((lang) => lang);
  const langItemIdx = usedLanguages.map((item) => item).indexOf(langKey);
  if (langItemIdx !== -1) {
    usedLanguages.splice(langItemIdx, 1);
  }
  return [...computedAvailableLanguages.value]
    .filter((lang: string) => !usedLanguages.includes(lang))
    .map((lang) => {
      return {
        title: lang,
        value: lang,
      };
    });
}
</script>
