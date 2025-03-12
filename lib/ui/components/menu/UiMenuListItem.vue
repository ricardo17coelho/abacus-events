<template>
  <VListItem
    v-if="canSeeItem(item)"
    :id="item.id"
    :key="`${item.key}-list-item`"
    :class="item.class"
    :color="item.color || color"
    :data-test-id="item.dataTestId"
    exact
    :href="item.href"
    :ripple="false"
    slim
    :target="item.target"
    :title="item.title"
    :to="item.to"
    :value="item.value || item.key"
    @click="item.action ? item.action(context) : undefined"
  >
    <template
      v-if="
        item.prepend ||
        Object.keys($slots).some((val) =>
          ['prepend', 'prepend-prepend', 'prepend-append'].includes(val),
        )
      "
      #prepend
    >
      <slot name="prepend">
        <slot name="prepend-prepend"></slot>
        <template v-if="item.prepend">
          <VIcon
            v-if="item.prepend.icon"
            class="px-0 mr-2"
            :size="
              isObject(item.prepend.icon) ? item.prepend.icon?.size : 'small'
            "
            v-bind="isObject(item.prepend.icon) ? item.prepend.icon : undefined"
          >
            {{
              isObject(item.prepend.icon)
                ? item.prepend.icon.icon
                : item.prepend.icon
            }}
          </VIcon>

          <UiStageLabel
            v-if="item.prepend.flag"
            class="mr-1"
            :flag="item.prepend.flag"
            size="x-small"
          />

          <span v-if="item.prepend.text" class="text-caption text-grey">
            {{ item.prepend.text }}
          </span>
        </template>
        <slot name="prepend-append"></slot>
      </slot>
    </template>

    <template
      v-if="
        item.append ||
        Object.keys($slots).some((val) =>
          ['append', 'append-prepend', 'append-append'].includes(val),
        )
      "
      #append
    >
      <slot name="append">
        <slot name="append-prepend"></slot>
        <template v-if="item.append">
          <VIcon
            v-if="item.append.icon"
            class="px-0 mr-2"
            :size="
              isObject(item.append.icon) ? item.append.icon?.size : 'small'
            "
            v-bind="isObject(item.append.icon) ? item.append.icon : undefined"
          >
            {{
              isObject(item.append.icon)
                ? item.append.icon.icon
                : item.append.icon
            }}
          </VIcon>

          <UiStageLabel
            v-if="item.append.flag"
            class="mx-1"
            :flag="item.append.flag"
            size="x-small"
          />

          <span v-if="item.append.text" class="text-caption text-grey">
            {{ item.append.text }}
          </span>
        </template>
        <slot name="append-append"></slot>
      </slot>
    </template>
  </VListItem>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
// vuetify components
import { VIcon, VListItem } from 'vuetify/components';
// components
import UiStageLabel from '../UiStageLabel.vue';
// types & constants
import { MenuItem } from './menu';
// utilities
import { isObject } from '@vueuse/core';

const props = defineProps({
  item: {
    type: Object as PropType<MenuItem>,
    default: () => ({}),
  },
  color: {
    type: String,
    default: undefined,
  },
  context: {
    type: Object,
    default: () => ({}),
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function canSeeItem(item: any) {
  if (!item) return;

  return item.show?.(props.context) ?? true;
}
</script>
