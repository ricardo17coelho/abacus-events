<template>
  <AppDialog v-model="model" :title="title" width="500">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <v-form ref="formRef">
        <FieldMultiLanguageText v-model="form" />
      </v-form>
    </template>
    <template #actions>
      <VBtnPrimary :loading="loading" @click="onSave">
        {{ t('actions.save') }}
      </VBtnPrimary>
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
import AppDialog from '@/components/app/AppDialog.vue';
import FieldMultiLanguageText from '@/components/fields/FieldMultiLanguageText.vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';

const model = defineModel({ type: Boolean, default: false });

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  i18n: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['save']);

const { t } = useI18n();

const formRef = ref();
const form = ref();

async function onSave() {
  const { valid } = await formRef.value.validate();
  if (valid) {
    emit('save', form.value);
    model.value = false;
  } else {
    toast.error(t('errors.validation.invalid'));
  }
}

watch(
  () => model.value,
  (newValue) => {
    if (newValue && props.i18n) {
      form.value = { ...props.i18n };
    }
  },
  { immediate: true },
);
</script>
