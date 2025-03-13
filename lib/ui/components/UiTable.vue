<template>
  <VCard rounded="lg" variant="flat">
    <UiForwardSlots :slots="$slots">
      <VDataTable
        v-bind="$attrs"
        class="elevation-1"
        :header-props="{ class: 'bg-surface-light' }"
        :headers="computedHeaders"
        :items="items"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        @click:row="onClickRow"
        @contextmenu:row="openContextMenu"
      >
        <template v-if="title || subtitle || $slots['toolbar-actions']" #top>
          <div class="pa-2">
            <h3
              class="d-flex justify-space-between align-center text-subtitle-1 font-weight-bold"
            >
              <span>
                {{ title }}
              </span>
              <slot name="toolbar-actions" />
            </h3>

            <div class="text-body-2 text-medium-emphasis my-2 w-100 w-md-75">
              {{ subtitle }}
            </div>
          </div>
        </template>
        <template #[`item.created_at`]="{ item }: { item: any }">
          <VChip>
            <span v-if="item.created_at">
              {{ formatDateTimeByFormat(item.created_at) }}
            </span>
            <span v-else>-</span>
          </VChip>
        </template>
        <template #[`item.logoUrl`]="{ item }: { item: any }">
          <UiAvatar
            v-if="item.logoUrl"
            class="border-solid"
            :logo="item.logoUrl"
            :logo-alt="`logo-url-${item.name}`"
          />
        </template>

        <template
          v-if="actions.length > 0"
          #[`item.actions`]="{ item }: { item: any }"
        >
          <slot :item="item" name="actions">
            <UiMenu :context="item" :items="actions" show-activator />
          </slot>
        </template>
      </VDataTable>
    </UiForwardSlots>
    <UiMenu
      v-model="showContextMenu"
      :context="currentItem"
      is-context-menu
      :items="actions"
      :target="[contextMenuPositionX, contextMenuPositionY]"
    ></UiMenu>
  </VCard>
</template>

<script setup lang="ts">
import { computed, type PropType, ref } from 'vue';
// vuetify components
import { VCard, VChip, VDataTable } from 'vuetify/components';
// UI components

import { UiAvatar } from './avatar';
import { UiForwardSlots } from './UiForwardSlots';
import { type MenuItem, UiMenu } from './menu';
// types
import type { ExtractProps } from '../types/utils.ts';
// utilities
import { formatDateTimeByFormat } from '../utils/date';

export type VDataTableProps = ExtractProps<typeof VDataTable>;

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  subtitle: {
    type: String,
    default: undefined,
  },
  items: {
    type: Array,
    default: () => [],
  },
  headers: {
    type: Array as PropType<VDataTableProps['headers']>,
    default: () => [],
  },
  actions: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});

const emit = defineEmits(['click:action', 'click:row']);

const computedHeaders = computed(
  () =>
    [
      ...(props.headers ?? []),
      { key: 'actions', sortable: false, align: 'end' },
    ] as const,
);

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function onClickRow(e: Event, params: any) {
  emit('click:row', { e, params });
}

const currentItem = ref();
const contextMenuPositionX = ref();
const contextMenuPositionY = ref();
const showContextMenu = ref(false);

function openContextMenu(
  event: MouseEvent | KeyboardEvent,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  { item }: { item: any },
) {
  event.preventDefault();
  currentItem.value = item;

  if (event instanceof MouseEvent) {
    // Use mouse position
    contextMenuPositionX.value = event.clientX;
    contextMenuPositionY.value = event.clientY;
  } else if (event instanceof KeyboardEvent) {
    // Use a fallback position for keyboard events (e.g., center of the screen)
    contextMenuPositionX.value = window.innerWidth / 2;
    contextMenuPositionY.value = window.innerHeight / 2;
  }

  showContextMenu.value = true;
}
</script>
