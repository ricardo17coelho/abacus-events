<template>
  <VMenu
    :label="t('ui_lib.fields.locale_select_menu.label')"
    name="field-locale-select-menu"
  >
    <template #activator="{ props: ActivatorProps }">
      <VBtn v-bind="ActivatorProps" prepend-icon="mdi-translate" size="small">
        <span v-if="model">
          {{ model.toUpperCase() }}
        </span>
      </VBtn>
    </template>

    <VList color="primary" density="compact" slim>
      <VListItem
        v-for="item in computedItems"
        :key="item.value"
        :active="model === item.value"
        :title="item.title"
        :value="item.value"
        @click="model = item.value"
      >
        <template v-if="model === item.value" #append>
          <VIcon color="success">mdi-check</VIcon>
        </template>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { VBtn, VIcon, VList, VListItem, VMenu } from 'vuetify/components';
// composables
import { useI18n } from 'vue-i18n';

defineOptions({
  inheritAttrs: false,
});

export type LocaleItem = {
  value: string;
  title: string;
};

const props = defineProps({
  items: {
    type: Array as PropType<LocaleItem[]>,
    default: () => [],
  },
  availableLocales: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const model = defineModel({ type: String, default: undefined });

const { availableLocales: i18nAvailableLocales, t } = useI18n();

const computedItems = computed<LocaleItem[]>(() =>
  props.items.length
    ? props.items
    : props.availableLocales.length
      ? props.availableLocales.map((i) => {
          return {
            value: i,
            title: i,
          };
        })
      : i18nAvailableLocales.map((i) => {
          return {
            value: i,
            title: i,
          };
        }),
);
</script>
