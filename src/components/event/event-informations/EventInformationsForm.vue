<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <FieldTextTitleI8n
          v-model="model.title"
          :available-locales="availableLocales"
          :label="t('labels.name')"
          :rules="[rulesValidation.ruleRequired]"
        >
        </FieldTextTitleI8n>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <UiHtmlEditorI18n
          v-model="model.content"
          :available-locales="availableLocales"
          :label="t('labels.message')"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import type { TitleI18n } from '@/types/TitleI18n';

export interface EventInformationsForm {
  title: TitleI18n;
  content: TitleI18n;
  img_path?: string;
}

export const DEFAULT_FORM: EventInformationsForm = {
  title: {} as TitleI18n,
  content: {} as TitleI18n,
};
</script>

<script lang="ts" setup>
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';
import { UiHtmlEditorI18n } from '@lib/ui';
import { useI18n } from 'vue-i18n';
import rulesValidation from '@/utils/validations';

const model = defineModel({
  type: Object as PropType<EventInformationsForm>,
  default: () => ({ ...DEFAULT_FORM }),
});

const { t, availableLocales } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
