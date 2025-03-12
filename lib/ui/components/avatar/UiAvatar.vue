<template>
  <VAvatar :color="avatarColor" :image="logo" :size="size" v-bind="$attrs">
    <slot v-if="$slots.logo || logo" name="logo">
      <VImg :alt="logoAlt" :src="logo"></VImg>
    </slot>
    <slot v-else-if="$slots.initials || initials" name="initials">
      <span :class="nameCls">
        {{ initials }}
      </span>
    </slot>
    <VIcon v-else-if="icon" color="white" size="small">{{ icon }}</VIcon>
  </VAvatar>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
// vuetify components
import { VAvatar, VIcon, VImg } from 'vuetify/components';
// utilities
import { getInitials } from '../../utils';

const props = defineProps({
  name: {
    type: String,
    default: undefined,
  },
  nameCls: {
    type: String,
    default: 'text-h6',
  },
  logo: {
    type: String,
    default: undefined,
  },
  logoAlt: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
  size: {
    type: [String, Number],
    default: 36,
  },
  icon: {
    type: String,
    default: undefined,
  },
});

const initials = computed(() =>
  props.name ? getInitials(props.name) : undefined,
);

const avatarColor = computed(() => {
  if (props.color) return props.color;
  return props.logo ? 'transparent' : 'primary';
});
</script>
