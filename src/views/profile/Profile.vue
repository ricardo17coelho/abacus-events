<template>
  <Page>
    <PageContent>
      Halloo

      <v-container>
        <v-text-field v-model="modelApiKey" hide-details lable="API KEY" />

        <v-btn @click="onSaveApi"> SET M API </v-btn>
      </v-container>

      <v-container>
        <v-text-field v-model="modelText" label="Translate" />
        <v-btn
          @click="
            onTranslateBatch({
              text: modelText,
              source: locale,
              targets: availableLocales.filter((i) => i !== locale),
            })
          "
        >
          TRANSLATE
        </v-btn>

        <div>
          <v-kbd>
            {{ translation }}
          </v-kbd>
        </div>
      </v-container>
    </PageContent>
  </Page>
</template>

<script setup lang="ts">
import { Page, PageContent } from '@/components/page';
import useApiProfileSettings from '@/api/profile-settings.ts';
import useApiAi, { type AiTranslateBatchPayload } from '@/api/ai.ts';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';

const { t, locale, availableLocales } = useI18n();
const { saveAiApiKey } = useApiProfileSettings();

const { translateBatch } = useApiAi();

const modelApiKey = ref();

async function onSaveApi() {
  const { data, error } = await saveAiApiKey(modelApiKey.value);
  console.warn('data', data);
  console.warn('error', error);
  if (error) {
    toast.error(t('errors.error_occurred'));
  }
  if (data) {
    toast.success('API KEY saved successfully.');
  }
}

const modelText = ref('Auto');
const translation = ref();
async function onTranslateBatch(payload: AiTranslateBatchPayload) {
  console.warn('onTranslateBatch', payload);
  const { data, error } = await translateBatch(payload);
  if (error) {
    toast.error(t('errors.error_occurred'));
  }
  if (data) {
    translation.value = data;
  }
}
</script>
