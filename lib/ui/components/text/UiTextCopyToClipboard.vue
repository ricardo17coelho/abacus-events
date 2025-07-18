<template>
  <VHover
    v-if="isSupported"
    :disabled="(showOnHover && !canHoverMediaQuery) || !canHoverMediaQuery"
  >
    <template #default="{ isHovering, props }">
      <div
        v-bind="props"
        class="d-flex align-center deep-text-copy-to-clipboard"
      >
        <slot>{{ text }}</slot>

        <VTooltip v-model="showTooltip">
          <template #activator="{ props: activatorProps }">
            <VIconBtn
              :class="{
                'opacity-0': !isHovering && showOnHover && canHoverMediaQuery,
              }"
              color="primary"
              icon="mdi-content-copy"
              size="small"
              variant="text"
              v-bind="mergeProps(activatorProps, $attrs)"
              @click="handleCopy"
            />
          </template>
          {{ copyTriggered ? t('labels.copied') : t('labels.copy') }}
          <v-icon v-if="copyTriggered" color="success" end>mdi-check</v-icon>
        </VTooltip>
      </div>
    </template>
  </VHover>
</template>

<script setup lang="ts">
import { mergeProps, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { VHover, VTooltip } from 'vuetify/components';
import { VIconBtn } from 'vuetify/labs/components';
import { useClipboard } from '@vueuse/core';
import { useHover } from '../../composables';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  showOnHover: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['copied', 'failed']);

const showTooltip = ref(false);

const { t } = useI18n();
const { text: copiedText, copy, copied, isSupported } = useClipboard();
const { canHoverMediaQuery } = useHover();

const copyTriggered = ref(false);

const handleCopy = async () => {
  copyTriggered.value = true;
  await copy(props.text);
};

watch(
  () => copied.value,
  (newValue) => {
    if (!copyTriggered.value) return;

    if (newValue) {
      emit('copied', copiedText.value);
    } else {
      emit('failed', props.text);
    }
  },
);

watch(
  () => showTooltip.value,
  (newValue) => {
    if (!newValue) {
      setTimeout(() => {
        copyTriggered.value = false;
      }, 200);
    }
  },
);
</script>
