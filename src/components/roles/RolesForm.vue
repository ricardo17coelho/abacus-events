<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <DialogTitleI18n :i18n="model.title" @save="model.title = $event">
          <template #activator="{ props: activatorProps }">
            <v-text-field
              label="Name"
              :model-value="modelValueTitle"
              readonly
              :rules="[rulesValidation.ruleRequired]"
              v-bind="activatorProps"
            >
            </v-text-field>
          </template>
        </DialogTitleI18n>
      </v-col>
    </v-row>

    <v-divider class="ma-6" inset></v-divider>

    <v-row dense>
      <v-col>
        <RolesPermissionsFieldSelect
          v-model="model.permissions"
          multiple
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// components
import DialogTitleI18n from '@/components/dialogs/DialogTitleI18n.vue';
import RolesPermissionsFieldSelect from './RolesPermissionsFieldSelect.vue';
// utils
import rulesValidation from '@/utils/validations';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';

const model = defineModel({ type: Object, default: () => ({}) });

const formRef = ref();

const modelValueTitle = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

defineExpose({ formRef });
</script>
