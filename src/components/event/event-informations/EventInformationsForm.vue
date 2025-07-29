<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <EventInformationsCategoriesField
          v-model="model.category_id"
          chips
          :event-id="eventId"
          :label="t('labels.category')"
          name="field-category"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
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
import type { EventInformation } from '@/api/types/EventInformation.ts';

export type EventInformationsForm = Pick<
  EventInformation,
  'title' | 'content'
> & {
  category_id: string | undefined;
};

export const DEFAULT_FORM: EventInformationsForm = {
  title: {},
  content: {},
  category_id: undefined,
};
</script>

<script lang="ts" setup>
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';
import { UiHtmlEditorI18n } from '@lib/ui';
import { useI18n } from 'vue-i18n';
import rulesValidation from '@/utils/validations';
import EventInformationsCategoriesField from '@/components/event/event-informations/event-informations-categories/EventInformationsCategoriesField.vue';

defineProps({
  eventId: {
    type: String,
    required: true,
  },
});

const model = defineModel({
  type: Object as PropType<EventInformationsForm>,
  default: () => ({ ...DEFAULT_FORM }),
});

const { t, availableLocales } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
