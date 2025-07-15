<template>
  <v-form ref="formRef">
    <v-row>
      <v-col align="center" cols="12">
        <AppFileUploadDialog
          :allowed-file-types="['image/*']"
          bucket="events"
          :folder-path="`${eventId}/persons`"
          :max-files="1"
          :on-save="onSave"
        >
          <template #activator="{ props: ActivatorProps }">
            <UiAvatarUser
              v-bind="ActivatorProps"
              border
              color="white"
              :logo="model.avatar_url ?? undefined"
              :name="getUserFullName(model) ?? undefined"
              size="100"
            />
          </template>
        </AppFileUploadDialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="model.first_name"
          :label="t('labels.first_name')"
          name="field-first_name"
          required
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="model.last_name"
          :label="t('labels.last_name')"
          name="field-last_name"
          required
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <FieldTextTitleI8n
          v-model="model.description"
          :label="t('labels.description')"
          name="field-description"
        />
      </v-col>
      <v-col cols="12">
        <v-label>{{ t('labels.bio') }}</v-label>
        <UiHtmlEditor
          v-if="currentModelLang"
          :key="currentModelLang"
          v-model="model.bio[currentModelLang]"
          v-model:locale="currentModelLang"
          :available-locales="availableLocales"
          :label="t('labels.bio')"
          show-locale-select
        >
        </UiHtmlEditor>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import type { EventPerson } from '@/api/types/EventPerson.ts';

export const DEFAULT_FORM = {
  first_name: undefined,
  last_name: undefined,
  event_id: undefined,
  description: {},
  bio: {},
  avatar_url: undefined,
};

export type EventPersonFormModel = Pick<
  EventPerson,
  'first_name' | 'last_name' | 'description' | 'bio' | 'avatar_url'
>;
</script>

<script lang="ts" setup>
// utils
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';
import AppFileUploadDialog from '@/components/app/AppFileUploadDialog.vue';
import type { UploadedAttachment } from '@/components/app/AppFileUpload.vue';
import { UiAvatarUser, UiHtmlEditor } from '@lib/ui';
import { getUserFullName } from '@/utils/profile.ts';
import FieldTextTitleI8n from '@/components/fields/FieldTextTitleI8n.vue';

defineProps({
  eventId: {
    type: String,
    required: true,
  },
});

const model = defineModel({
  type: Object as PropType<EventPersonFormModel>,
  default: () => ({ ...DEFAULT_FORM }),
});

const { t, availableLocales, locale } = useI18n();
const currentModelLang = ref(locale.value);

const formRef = ref();

async function onSave(attachments: UploadedAttachment[] = []) {
  if (attachments.length) {
    model.value.avatar_url = attachments[0].url;
  }
}

defineExpose({ formRef });
</script>
