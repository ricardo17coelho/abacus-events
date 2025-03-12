<template>
  <UiForwardSlots :slots="$slots">
    <VMenu
      v-bind="$attrs"
      :absolute="isContextMenu"
      :location="xs ? 'bottom' : 'end'"
      :open-on-focus="false"
    >
      <template #activator="activator">
        <UiMenuListItem
          v-if="props.isSubMenu"
          v-bind="activator.props"
          :item="props"
        >
          <template #append-append>
            <VIcon size="small">$next</VIcon>
          </template>
        </UiMenuListItem>
        <slot
          :is-active="activator.isActive"
          name="activator"
          :props="activator.props"
        >
          <v-btn
            v-if="showActivator"
            icon="mdi-dots-vertical"
            size="small"
            variant="text"
            v-bind="{ ...activatorProps, ...activator.props }"
            @click.prevent.stop
          />
        </slot>
      </template>

      <VList :density="props.density" slim>
        <template v-for="item in items" :key="item.key">
          <VDivider
            v-if="item.divider"
            :key="`${item.key}-divider`"
            :class="item.space"
          />
          <VSpacer
            v-else-if="item.spacer"
            :key="`${item.key}-spacer`"
            :class="item.space"
          />
          <UiMenu
            v-else-if="item.items"
            :append="item.append"
            :color="item.color"
            :density="props.density"
            :is-sub-menu="true"
            :items="item.items"
            :location="xs ? 'bottom' : 'left'"
            :open-on-focus="false"
            :prepend="item.prepend"
            submenu
            :title="item.title"
          />
          <template v-else>
            <UiMenuListItem :context="context" :item="item" />
          </template>
        </template>
      </VList>
    </VMenu>
  </UiForwardSlots>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
// vuetify components
import {
  type VBtn,
  VDivider,
  VIcon,
  VList,
  VMenu,
  VSpacer,
} from 'vuetify/components';
// components
import UiMenuListItem from './UiMenuListItem.vue';
import { UiForwardSlots } from '../UiForwardSlots';
// types & constants
import type { ExtractProps } from '../../types';
// composables
import { useDisplay } from 'vuetify';
import { MenuItem, MenuItemPrependAppend } from './menu';

export type VListProps = InstanceType<typeof VList>['$props'];

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  items: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  isSubMenu: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  append: {
    type: Object as PropType<MenuItemPrependAppend>,
    default: () => ({}),
  },
  prepend: {
    type: Object as PropType<MenuItemPrependAppend>,
    default: () => ({}),
  },
  dataTestId: {
    type: String,
    default: undefined,
  },
  density: {
    type: String as PropType<VListProps['density']>,
    default: 'default',
  },
  context: {
    type: Object,
    default: undefined,
  },
  showActivator: {
    type: Boolean,
    default: false,
  },
  activatorProps: {
    type: Object as PropType<ExtractProps<typeof VBtn>>,
    default: () => ({}),
  },
  isContextMenu: {
    type: Boolean,
    default: false,
  },
});

const { xs } = useDisplay();
</script>
