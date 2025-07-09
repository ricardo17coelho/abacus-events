<template>
  <UiLoaderAnimation v-if="state === 'loading'" centered />
  <iframe
    v-show="state === 'done'"
    id="deep-iframe"
    ref="iframe"
    allow="clipboard-read; clipboard-write"
    class="iframe"
    height="100%"
    :src="src"
    title="hybrid-deep-admin"
    width="100%"
    @load="state = 'done'"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { UiLoaderAnimation } from '@lib/ui';

defineProps({
  src: {
    type: String,
    required: true,
  },
});

const iframe = ref();
const state = ref<'loading' | 'done'>('loading');

onMounted(() => {
  if (iframe.value?.contentDocument) {
    const style = document.createElement('style');
    style.textContent = `
          .pcoded-content {
            padding: 0 !important;
          }
        `;
    iframe.value.contentDocument.head.appendChild(style);
  }
});
</script>

<style lang="postcss">
.iframe {
  border: none;
  min-height: calc(100dvh - 65px);
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.dark .iframe {
  @apply mix-blend-screen invert;
}
</style>
