<template>
  <div v-if="currentFlag">
    <template v-if="displayAs === 'icon' && currentFlag.icon">
      <VIcon
        :color="currentFlag.color || color"
        :icon="currentFlag.icon"
        v-bind="$attrs"
      ></VIcon>
    </template>
    <template v-else>
      <VChip
        v-if="
          displayAs === 'chip' ||
          (displayAs === 'icon' &&
            !currentFlag.icon &&
            (!iconDisplayAsFallback || iconDisplayAsFallback === 'chip'))
        "
        class="text-white core-stage-label-chip"
        :color="currentFlag.color || color"
        v-bind="$attrs"
      >
        {{ currentFlag.text }}
      </VChip>
      <VBadge
        v-else-if="
          displayAs === 'badge' ||
          (!currentFlag.icon && iconDisplayAsFallback === 'badge')
        "
        :color="currentFlag.color || color"
        :content="currentFlag.text"
        v-bind="$attrs"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
// vuetify components
import { VBadge, VChip, VIcon } from 'vuetify/components';
// types & constants
import {
  type Flags,
  FLAGS,
  FlagVariants,
  FlagVariantsWithoutIcon,
  VARIANTS,
  VARIANTS_WITHOUT_ICON,
} from '../types/stage-label';
// utilities
import type { ValueOf } from '../utils/valueOf';

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  flag: {
    type: String as PropType<Flags>,
    default: undefined,
  },
  displayAs: {
    type: String as PropType<FlagVariants>,
    default: 'icon',
    validator(value: ValueOf<typeof VARIANTS>) {
      // The value must match one of these strings
      return Object.values(VARIANTS).includes(value);
    },
  },
  iconDisplayAsFallback: {
    type: String as PropType<FlagVariantsWithoutIcon>,
    default: undefined,
    validator(value: Partial<ValueOf<typeof VARIANTS_WITHOUT_ICON>>) {
      // The value must match one of these strings
      return Object.values(VARIANTS_WITHOUT_ICON).includes(value);
    },
  },
});

const currentFlag = computed(() => {
  if (!props.flag) return undefined;
  return FLAGS[props.flag];
});
</script>

<style lang="scss" scoped>
.core-stage-label-chip {
  padding: 0 6px;
}
</style>
