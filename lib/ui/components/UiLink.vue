<template>
  <component
    :is="tag"
    class="app-link text-primary font-weight-medium d-inline-flex align-center cursor-pointer"
    v-bind="attrs"
  >
    <slot
      v-if="
        prependIcon ||
        (iconProps &&
          isSamePage &&
          (iconProps.prependIcon || iconProps.icon)) ||
        $slots['icon-prepend']
      "
      name="icon-prepend"
    >
      <span>
        <VIcon
          v-if="prependIcon"
          :icon="prependIcon"
          v-bind="iconPropsDefault"
        />
        <VIcon v-else-if="iconProps && isSamePage" v-bind="iconProps" />
      </span>
    </slot>

    <slot />

    <slot
      v-if="
        appendIcon ||
        (iconProps &&
          !isSamePage &&
          (iconProps.appendIcon || iconProps.icon)) ||
        $slots['icon-append']
      "
      name="icon-append"
    >
      <span class="d-inline-flex icon-append">
        <VIcon v-if="appendIcon" v-bind="iconPropsDefault" :icon="appendIcon" />
        <VIcon v-else-if="iconProps && !isSamePage" v-bind="iconProps" />
      </span>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import { VIcon } from 'vuetify/components';

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
  },
  prependIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  tag: {
    type: String,
    default: undefined,
  },
});

const supportedExternalTypesUrls = ['http', 'https'];
const supportedExternalTypesOthers = ['mailto', 'tel'];
const supportedExternalTypes = supportedExternalTypesUrls.concat(
  supportedExternalTypesOthers,
);

function checkIfStringStartsWithSomeOfList(str: string, list: string[]) {
  return list.some((i) => str.startsWith(i));
}

const isExternal = computed(() =>
  checkIfStringStartsWithSomeOfList(props.href, supportedExternalTypes),
);

const isExternalLink = computed(() =>
  checkIfStringStartsWithSomeOfList(props.href, supportedExternalTypesUrls),
);

const isSamePage = computed(
  () => !isExternal.value && props.href.startsWith('#'),
);
const attrs = computed(() => {
  let params = {};

  if (isExternal.value) {
    params = {
      href: props.href,
    };

    if (isExternalLink.value) {
      params = {
        ...params,
        target: '_blank',
        rel: 'noopener',
      };
    }
  } else {
    params = {
      to: isSamePage.value ? props.href : props.to,
    };
  }

  return params;
});

const icon = computed(() => {
  if (isSamePage.value) return 'mdi-pound';
  if (isExternal.value) return 'mdi-open-in-new';
  if (props.href) return 'mdi-page-next';

  return null;
});

const iconPropsDefault = computed(() => {
  return {
    class: `m${isSamePage.value ? 'e' : 's'}-1`,
  };
});

const iconProps = computed(() => {
  if (!icon.value) return null;

  return {
    icon:
      props.prependIcon !== undefined || props.appendIcon !== undefined
        ? undefined
        : icon.value,
    prependIcon: props.prependIcon,
    appendIcon: props.appendIcon,
    size: '.75em',
    ...iconPropsDefault.value,
  };
});
const tag = computed(() =>
  props.tag ? props.tag : isExternal.value ? 'a' : 'router-link',
);
</script>

<style lang="scss" scoped>
.app-link {
  text-decoration: none;
  max-width: 100%;

  p {
    margin-bottom: 0;
  }

  &:hover {
    text-decoration: underline;
  }

  .icon-append {
    margin-left: 2px;
  }
}
</style>
