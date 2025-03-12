<template>
  <VDialog
    v-bind="$attrs"
    ref="baseDialog"
    v-model="model"
    :fullscreen="fullscreen"
    :height="fullscreen || forceFullscreenOnMobile ? '100%' : height"
    :max-height="fullscreen || forceFullscreenOnMobile ? '100%' : maxHeight"
    :max-width="fullscreen || forceFullscreenOnMobile ? '100%' : maxWidth"
    :no-click-animation="movable"
    :persistent="computedPersistent"
    :scrim="movableModel ? false : scrim"
    :scrollable="scrollable"
    :width="fullscreen || forceFullscreenOnMobile ? '100%' : height"
    @keydown.esc="onKeydownEsc"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #default="{ isActive }">
      <VCard
        ref="baseDialogCard"
        class="mx-auto"
        :rounded="rounded"
        width="100%"
        v-bind="cardProps"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseout="onMouseMove"
        @mouseup="onMouseUp"
      >
        <component
          :is="titleComponent"
          v-if="titleComponent"
          v-bind="titleComponentProps"
        />

        <slot
          v-else-if="
            (!titleComponent && (title || icon || closable)) ||
            $slots['card-title-content'] ||
            $slots['card-title-content-title'] ||
            $slots['card-title-content-icon'] ||
            $slots['card-title-content-actions-prepend'] ||
            $slots['card-title-content-actions']
          "
          name="card-title"
        >
          <VCardTitle
            class="pr-2 text-subtitle-1"
            :class="{ 'cursor-move ui-prevent-select': movableModel }"
            v-bind="cardTitleProps"
          >
            <slot name="card-title-content">
              <div class="d-flex align-center dialog-title-container">
                <div
                  class="d-flex flex-grow-1 align-center dialog-title-icon-container"
                >
                  <slot name="card-title-content-icon">
                    <VIcon
                      v-if="icon"
                      class="dialog-title-icon"
                      :icon="icon"
                      start
                    />
                  </slot>
                  <div class="dialog-title">
                    <slot name="card-title-content-title">
                      <div class="pr-1">
                        {{ title }}
                      </div>
                    </slot>
                  </div>
                </div>
                <div class="d-flex dialog-title-actions">
                  <slot name="card-title-content-actions-prepend" />
                  <slot name="card-title-content-actions">
                    <VBtn
                      v-if="showFullscreen"
                      :icon="
                        fullscreen ? '$iconFullscreenOff' : '$iconFullscreen'
                      "
                      size="small"
                      variant="plain"
                      @click="fullscreen = !fullscreen"
                    >
                    </VBtn>
                    <VBtn
                      v-if="movable && !fullscreen"
                      v-tooltip="{
                        text: movableModel
                          ? t('ui_lib.dialogs.disable_move')
                          : t('ui_lib.dialogs.activate_move'),
                        openDelay: 300,
                      }"
                      :disabled="fullscreen"
                      :icon="movableModel ? '$iconPin' : '$iconPinOff'"
                      size="small"
                      variant="plain"
                      @click="movableModel = !movableModel"
                    >
                    </VBtn>
                    <VBtn
                      v-if="closable"
                      icon="$close"
                      size="small"
                      variant="plain"
                      @click="model = false"
                    >
                    </VBtn>
                  </slot>
                  <slot name="card-title-content-actions-append" />
                </div>
              </div>
            </slot>
          </VCardTitle>
        </slot>

        <VDivider v-if="showTitleDivider" />

        <VCardItem v-if="loading || $slots.loading" :class="loadingItemCls">
          <slot v-if="loading" name="loading">
            <div class="text-center ma-10" :class="loadingCls">
              <div class="loading-animation">
                <UiLoaderAnimation :color="loadingColor" />
              </div>
              <div class="loading-text">
                {{ loadingText }}
              </div>
            </div>
          </slot>
        </VCardItem>

        <VCardText
          v-else-if="!loading && $slots.content"
          ref="baseDialogCardText"
          :class="computedCardTextCls"
          :style="{ height: heightContent, maxHeight: maxHeightContent }"
          v-bind="cardTextProps"
        >
          <slot name="content"></slot>
        </VCardText>

        <VDivider v-if="showActionsDivider" />

        <VDefaultsProvider
          :defaults="{
            VCardActions: {
              VBtnPrimary: {
                block: forceFullscreenActionsOnMobile,
              },
              VBtnSecondary: {
                block: forceFullscreenActionsOnMobile,
              },
              VBtnTertiary: {
                block: forceFullscreenActionsOnMobile,
              },
              VBtn: {
                block: forceFullscreenActionsOnMobile,
              },
            },
          }"
        >
          <VCardActions
            v-if="!loading && $slots.actions"
            ref="baseDialogCardActions"
            class="pa-4"
            :class="computedCardActionsCls"
            v-bind="cardActionsProps"
          >
            <slot :is-active="isActive" name="actions"></slot>
          </VCardActions>
        </VDefaultsProvider>
      </VCard>
    </template>
  </VDialog>
</template>
<script lang="ts" setup>
import { type Component, computed, type PropType, ref, watch } from 'vue';
// vuetify components
import {
  VBtn,
  VCard,
  VCardActions,
  VCardItem,
  VCardText,
  VCardTitle,
  VDefaultsProvider,
  VDialog,
  VDivider,
  VIcon,
} from 'vuetify/components';
// components
import UiLoaderAnimation from './loader/UiLoaderAnimation.vue';
// composables
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';
import { ExtractProps } from '../types';

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  titleComponent: {
    type: Object as PropType<Component>,
    default: undefined,
  },
  titleComponentProps: {
    type: Object,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  scrollable: {
    type: Boolean,
    default: true,
  },
  cardTextCls: {
    type: String,
    default: undefined,
  },
  cardTextFluid: {
    type: Boolean,
    default: false,
  },
  cardActionsCls: {
    type: [String, Object],
    default: undefined,
  },
  cardTitleCls: {
    type: [String, Object],
    default: undefined,
  },
  toolbarTitleCls: {
    type: String,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: undefined,
  },
  loadingColor: {
    type: String,
    default: undefined,
  },
  loadingItemCls: {
    type: String,
    default: undefined,
  },
  loadingCls: {
    type: String,
    default: undefined,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  showFullscreen: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
  maxHeight: {
    type: [Number, String],
    default: undefined,
  },
  minHeight: {
    type: [Number, String],
    default: undefined,
  },
  maxWidth: {
    type: [Number, String],
    default: undefined,
  },
  heightContent: {
    type: [Number, String],
    default: undefined,
  },
  maxHeightContent: {
    type: [Number, String],
    default: undefined,
  },
  movable: {
    type: Boolean,
    default: false,
  },
  scrim: {
    type: Boolean,
    default: true,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: String,
    default: 'lg',
  },
  fullscreenOnMobile: {
    type: Boolean,
    default: false,
  },
  cardProps: {
    type: Object as PropType<ExtractProps<typeof VCard>>,
    default: undefined,
  },
  cardTitleProps: {
    type: Object as PropType<ExtractProps<typeof VCardTitle>>,
    default: undefined,
  },
  cardTextProps: {
    type: Object as PropType<ExtractProps<typeof VCardText>>,
    default: undefined,
  },
  cardActionsProps: {
    type: Object as PropType<ExtractProps<typeof VCardActions>>,
    default: undefined,
  },
  cardActionsBlockOnMobile: {
    type: Boolean,
    default: true,
  },
  showTitleDivider: {
    type: Boolean,
    default: true,
  },
  showActionsDivider: {
    type: Boolean,
    default: false,
  },
  preventCloseOnClickOutside: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ type: Boolean, default: false });
const fullscreen = defineModel('fullscreen', { type: Boolean, default: false });

const emit = defineEmits(['close', 'open']);

const { xs } = useDisplay();
const { t } = useI18n();

const forceFullscreenOnMobile = computed(
  () => xs.value && props.fullscreenOnMobile,
);

const forceFullscreenActionsOnMobile = computed(
  () =>
    forceFullscreenOnMobile.value ||
    (xs.value && props.cardActionsBlockOnMobile),
);

const computedCardActionsCls = computed(() => {
  if (props.cardActionsCls) return props.cardActionsCls;

  return {
    'flex-column': forceFullscreenActionsOnMobile.value,
  };
});

const computedCardTextCls = computed(() => {
  if (props.cardTextCls) return props.cardTextCls;

  return {
    'pa-4': !props.cardTextFluid,
    'pa-0': props.cardTextFluid,
  };
});

const computedPersistent = computed(
  () => props.preventCloseOnClickOutside || !props.closable || props.persistent,
);

watch(
  () => model.value,
  (newValue) => {
    if (newValue) {
      emit('open');
    } else {
      emit('close');
    }
  },
);

// handle movable
const movableModel = ref(false);

interface MovableParams {
  el: HTMLElement | undefined;
  mouseStartX: number;
  mouseStartY: number;
  elStartX: number;
  elStartY: number;
  oldTransition: string;
}

const movableParams = ref<MovableParams>({} as MovableParams);

watch(
  () => fullscreen.value,
  (newValue) => {
    if (newValue) {
      movableParams.value = {} as MovableParams;
      movableModel.value = false;
    }
  },
);

function onMouseDown(e: MouseEvent) {
  const eTarget = e.target as HTMLElement;
  let allowedClassList = [
    'v-card-title',
    'dialog-title-icon-container',
    'dialog-title-icon',
    'dialog-title-container',
    'dialog-title',
  ];
  const notAllowedClassList = ['dialog-title-actions'];
  allowedClassList = allowedClassList.filter(
    (i) => !notAllowedClassList.includes(i),
  );
  const targetClassList = Array.from(eTarget.classList);
  if (
    !movableModel.value ||
    !e ||
    !eTarget ||
    !props.movable ||
    !allowedClassList.some((r) => targetClassList.includes(r))
  ) {
    return;
  }
  if (props.movable) {
    e.preventDefault();
  }
  movableParams.value = {} as MovableParams;
  const closestDialog = eTarget.closest('.v-overlay__content');
  if (e.button === 0 && closestDialog) {
    // element which can be used to move element
    movableParams.value.el = closestDialog as HTMLElement; // element which should be moved
    movableParams.value.mouseStartX = e.clientX;
    movableParams.value.mouseStartY = e.clientY;
    if (movableParams.value.el) {
      movableParams.value.elStartX =
        movableParams.value.el.getBoundingClientRect().left;
      movableParams.value.elStartY =
        movableParams.value.el.getBoundingClientRect().top;
      movableParams.value.el.style.position = 'fixed';
      movableParams.value.el.style.margin = '0';
      movableParams.value.oldTransition =
        movableParams.value.el.style.transition;
      movableParams.value.el.style.transition = 'none';
    }
  }
}

function onMouseUp() {
  if (movableParams.value.el === undefined) {
    return;
  }
  movableParams.value.el.style.transition = movableParams.value.oldTransition;
  movableParams.value.el = undefined;
}

function onMouseMove(e: MouseEvent) {
  if (!movableParams.value?.el) {
    return;
  }
  if (props.movable) {
    let left;
    let top;
    if (movableParams.value.elStartX && movableParams.value.mouseStartX) {
      left =
        movableParams.value.elStartX +
        e.clientX -
        movableParams.value.mouseStartX;
    }
    if (movableParams.value.elStartY && movableParams.value.mouseStartY) {
      top =
        movableParams.value.elStartY +
        e.clientY -
        movableParams.value.mouseStartY;
    }

    if (props.movable && left && top) {
      movableParams.value.el.style.left = left + 'px';
      movableParams.value.el.style.top = top + 'px';
    } else {
      if (left) {
        movableParams.value.el.style.left =
          Math.min(
            Math.max(left, 0),
            window.innerWidth -
              movableParams.value.el.getBoundingClientRect().width,
          ) + 'px';
      }
      if (top) {
        movableParams.value.el.style.top =
          Math.min(
            Math.max(top, 0),
            window.innerHeight -
              movableParams.value.el.getBoundingClientRect().height,
          ) + 'px';
      }
    }
  }
}

function onKeydownEsc() {
  if (props.preventCloseOnClickOutside) {
    model.value = false;
  }
}
</script>
<style lang="scss" scoped>
.dialog-title-icon-container {
  min-width: 0;
}
</style>
