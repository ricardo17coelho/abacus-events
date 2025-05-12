<template>
  <AppStateSoonAlert class="mb-6" density="compact" />

  <v-row>
    <v-col cols="12" md="6">
      <VCardSettings height="100%" title="Open AI">
        <v-card-text>
          <v-list-item
            v-if="!!userSettings?.openai_api_key_encrypted"
            title="OpenAI key enabled"
          >
            <template #prepend>
              <v-avatar image="/images/open-ai-logo.png" />
            </template>
            <template #append>
              <v-icon-btn
                color="error"
                icon="mdi-delete"
                variant="text"
                @click="
                  updateProfileSetting(user.id, {
                    openai_api_key_encrypted: undefined,
                  })
                "
              />
            </template>
          </v-list-item>
          <v-text-field
            v-else
            v-model="modelApiKey"
            hide-details
            label="API KEY"
          />
        </v-card-text>
        <v-card-actions v-if="!userSettings?.openai_api_key_encrypted">
          <v-spacer />
          <VBtnPrimary :disabled="!modelApiKey" @click="onSaveApi">
            SET MY API
          </VBtnPrimary>
        </v-card-actions>
      </VCardSettings>
    </v-col>
    <v-col cols="12" md="6">
      <VCardSettings height="100%" title="Debug - Translations">
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
      </VCardSettings>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import useApiProfileSettings from '@/api/profile-settings.ts';
import useApiAi, {
  type AiTranslateBatchPayload,
  type AiTranslateBatchTranslation,
} from '@/api/ai.ts';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import AppStateSoonAlert from '@/components/app/AppStateSoonAlert.vue';
import useAuthUser from '@/composables/auth-user.ts';
import type { ProfileSettings } from '@/api/types/Profile.ts';

const { t, locale, availableLocales } = useI18n();
const { saveAiApiKey, getProfileSettingById, updateProfileSetting } =
  useApiProfileSettings();

const { translateBatch } = useApiAi();
const { user } = useAuthUser();

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
const userSettings = ref<ProfileSettings>();
async function onGetUserSettings() {
  const { data, error } = await getProfileSettingById(user.value.id);
  if (error) {
    toast.error(t('errors.error_occurred'));
  }
  if (data) {
    console.warn('data', data);
    userSettings.value = data;
  }
}
onMounted(() => onGetUserSettings());

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
