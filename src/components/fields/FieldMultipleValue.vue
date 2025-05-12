<template>
  <div v-if="label" class="text-subtitle-1 text-medium-emphasis">
    {{ label }}
  </div>
  <template v-if="Array.isArray(model) && model.length">
    <v-col
      v-for="(_, idx) in model"
      :key="`field-multiple-value-${idx}`"
      cols="12"
    >
      <DialogTitleI18n
        v-if="multipleLanguageMode"
        :i18n="model[idx]"
        @save="model[idx] = $event"
      >
        <template #activator="{ props: activatorProps }">
          <FieldMultipleValueTextField
            v-model:list="model"
            v-bind="activatorProps"
            :idx="idx"
            :label="labelField"
            :model-value="model[idx]"
            readonly
            @click:add="onFieldAdd"
            @click:remove="onFieldRemove(idx)"
          />
        </template>
      </DialogTitleI18n>
      <FieldMultipleValueTextField
        v-else
        v-model:list="model"
        v-bind="activatorProps"
        :idx="idx"
        :label="labelField"
        :model-value="model[idx]"
        @click:add="onFieldAdd"
        @click:remove="onFieldRemove(idx)"
      />
    </v-col>
  </template>
  <v-col v-else class="my-2" cols="12">
    <VBtnPrimary @click="model.push('')">
      {{ t('actions.add') }}
    </VBtnPrimary>
  </v-col>
</template>

<script setup lang="ts">
import DialogTitleI18n from '@/components/dialogs/DialogTitleI18n.vue';
import FieldMultipleValueTextField from '@/components/fields/FieldMultipleValueTextField.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
  labelField: {
    type: String,
    default: undefined,
  },
  multipleLanguageMode: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ type: Array, default: () => [] });

const { t } = useI18n();

function onFieldAdd() {
  if (props.multipleLanguageMode) {
    model.value.push({});
  } else {
    model.value.push('');
  }
}

function onFieldRemove(idx: number) {
  if (idx === undefined) return;
  model.value.splice(idx, 1);
}
</script>
