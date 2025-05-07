<template>
  <v-text-field
    autocomplete="off"
    :label="label ? `${label} ${idx + 1}` : undefined"
    :model-value="modelValueI18n"
    v-bind="$attrs"
  >
    <template #append>
      <v-icon-btn
        v-if="modelList.length === 0 || idx === modelList.length - 1"
        @click.stop.prevent="emit('click:add')"
      >
        +
      </v-icon-btn>
      <v-icon-btn
        v-if="modelList.length > 1"
        @click.stop.prevent="emit('click:remove')"
      >
        -
      </v-icon-btn>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';

defineProps({
  label: {
    type: String,
    default: undefined,
  },
  idx: {
    type: Number,
    default: 0,
  },
});

const model = defineModel({ type: Object, default: () => ({}) });
const modelList = defineModel('list', { type: Array, default: () => [] });

const emit = defineEmits(['click:add', 'click:remove']);

const modelValueI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value),
);
</script>
