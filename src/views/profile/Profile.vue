<template>
  <Page>
    <PageHeading title="Profile" />
    <PageContent>
      <v-container>
        <v-card flat>
          <v-card-text>
            <v-text-field v-model="modelApiKey" hide-details label="API KEY" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <VBtnPrimary :disabled="!modelApiKey" @click="onSaveApi">
              SET MY API
            </VBtnPrimary>
          </v-card-actions>
        </v-card>
      </v-container>

      <v-container>
        <v-card flat>
          <v-card-text>
            <v-text-field
              v-model="modelText"
              label="Translate"
              :prefix="locale"
            />
            <v-switch v-model="forceOpenAPI" label="FORCE OpenAI" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <VBtnPrimary
              @click="
                onTranslateBatch({
                  text: modelText,
                  source: locale,
                  targets: availableLocales.filter((i) => i !== locale),
                  force_api: forceOpenAPI,
                })
              "
            >
              TRANSLATE
            </VBtnPrimary>
          </v-card-actions>

          <template v-if="translations">
            <div>
              <v-kbd>
                {{ translations }}
              </v-kbd>
            </div>

            <v-container>
              <v-row>
                <v-col
                  v-for="(translation, translationLang) in translations"
                  :key="translationLang"
                >
                  <v-text-field
                    label="Translate"
                    :model-value="translation.value"
                    :prefix="translationLang"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-card>
      </v-container>
    </PageContent>
  </Page>
</template>

<script setup lang="ts">
import { Page, PageContent, PageHeading } from '@/components/page';
import useApiProfileSettings from '@/api/profile-settings.ts';
import useApiAi, {
  type AiTranslateBatchPayload,
  type AiTranslateBatchTranslation,
} from '@/api/ai.ts';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';

const { t, locale, availableLocales } = useI18n();
const { saveAiApiKey } = useApiProfileSettings();

const { translateBatch } = useApiAi();

const modelApiKey = ref();
const forceOpenAPI = ref(false);

async function onSaveApi() {
  const { data, error } = await saveAiApiKey(modelApiKey.value);
  if (error) {
    toast.error(t('errors.error_occurred'));
  }
  if (data) {
    toast.success('API KEY saved successfully.');
  }
}

const modelText = ref('Auto');
const translations = ref<AiTranslateBatchTranslation>();
async function onTranslateBatch(payload: AiTranslateBatchPayload) {
  console.warn('onTranslateBatch', payload);
  const { data, error } = await translateBatch(payload);
  if (error) {
    toast.error(t('errors.error_occurred'));
  }
  if (data) {
    translations.value = data.translations;
  }
}
</script>
