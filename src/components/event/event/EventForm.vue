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
            >
              <template #append-inner>
                <UiInfoHint
                  text="The title of the event. Should be entered in all available languages"
                />
              </template>
            </v-text-field>
          </template>
        </DialogTitleI18n>
      </v-col>
      <v-col cols="12">
        <DialogTitleI18n :i18n="model.subtitle" @save="model.subtitle = $event">
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :label="t('labels.subtitle')"
              :model-value="modelValueSubtitleI18n"
              v-bind="activatorProps"
            >
              <template #append-inner>
                <UiInfoHint
                  text="The subtitle helps to describe the event name. Should be entered in all available languages"
                />
              </template>
            </v-text-field>
          </template>
        </DialogTitleI18n>
      </v-col>
      <v-col cols="12">
        <UiHtmlEditor
          v-if="currentModelLang"
          :key="currentModelLang"
          v-model="model.description[currentModelLang]"
          v-model:locale="currentModelLang"
          :available-locales="availableLocales"
          show-locale-select
        >
        </UiHtmlEditor>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field v-model="model.slug" :label="t('labels.slug')">
          <template #append-inner>
            <UiInfoHint
              text="The slug can be used to find the event, instead of using the UUID. Typically the slug should match the event name and be hyphenated"
            />
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-date-input
          v-model="model.date"
          display-format="keyboardDate"
          :label="t('labels.date')"
          :min="today"
        >
          <template #append-inner>
            <UiInfoHint text="The date of the event" />
          </template>
        </v-date-input>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-switch
          v-model="model.public"
          class="mx-3"
          :label="t('labels.public')"
        >
          <template #append>
            <UiInfoHint
              text="Defines if the event is public accessible or not"
            />
          </template>
        </v-switch>
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
import { toHyphenated, UiHtmlEditor } from '@lib/ui';
import UiInfoHint from '@lib/ui/components/UiInfoHint.vue';
import { watch } from 'vue';

const model = defineModel({ type: Object, default: () => ({}) });

const { t, availableLocales, locale } = useI18n();
const currentModelLang = ref(locale.value);

const today = new Date();

const formRef = ref();

const modelValueTitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

const modelValueSubtitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.subtitle),
);

watch(
  () => model.value?.title,
  (newValue) => {
    if (!model.value?.slug && newValue && newValue.en) {
      model.value.slug = toHyphenated(newValue.en);
    }
  },
);

defineExpose({ formRef });
</script>
