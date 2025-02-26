<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <DialogTitleI18n :i18n="model.title" @save="model.title = $event">
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :label="t('labels.name')"
              :model-value="modelValueNameI18n"
              readonly
              :rules="[rulesValidation.ruleRequired]"
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field v-model="model.location" :label="t('labels.location')" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.location_url"
          :label="t('labels.location_url')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-number-input
          v-model="model.total_slots"
          control-variant="stacked"
          inset
          :label="t('labels.slots_total')"
          :min="0"
          :rules="[rulesValidation.ruleRequired]"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-number-input
          v-model="model.filled_slots"
          control-variant="stacked"
          inset
          :label="t('labels.slots_filled')"
          :min="0"
          type="number"
          variant="outlined"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// utils
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';
import rulesValidation from '@/utils/validations';
import DialogTitleI18n from '../dialogs/DialogTitleI18n.vue';
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

const modelValueNameI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

defineExpose({ formRef });
</script>
