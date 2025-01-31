<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <DialogTitleI18n
          :i18n="model.name"
          @save="model.name = $event"
        >
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :model-value="modelValueNameI18n"
              :label="t('labels.name')"
              :rules="[rulesValidation.ruleRequired]"
              readonly
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.location"
          :label="$t('labels.location')"
        />
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
      <v-col
        cols="12"
        sm="6"
      >
        <v-number-input
          v-model="model.total_slots"
          :label="t('labels.slots_total')"
          :rules="[rulesValidation.ruleRequired]"
          control-variant="stacked"
          variant="outlined"
          :min="0"
          inset
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-number-input
          v-model="model.filled_slots"
          type="number"
          :label="t('labels.slots_filled')"
          control-variant="stacked"
          variant="outlined"
          :min="0"
          inset
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
  showDefaultTranslationOrEmpty(model.value?.name)
);

defineExpose({ formRef });
</script>
