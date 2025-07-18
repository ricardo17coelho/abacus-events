<template>
  <v-snackbar
    v-model="showUpdatePrompt"
    class="reload-prompt"
    color="white"
    location="top"
    min-width="300"
    :timeout="-1"
    variant="elevated"
    vertical
    v-bind="$attrs"
  >
    <slot name="text">
      {{ t('sw_reload_prompt.text') }}
    </slot>
    <template #actions>
      <v-btn size="small" variant="plain" @click="dismissUpdate">
        {{ t('sw_reload_prompt.actions.reload_later') }}
      </v-btn>
      <v-spacer />
      <VBtnPrimary class="ml-4" size="small" @click="reloadApp">
        {{ t('sw_reload_prompt.actions.reload_now') }}
      </VBtnPrimary>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const showUpdatePrompt = ref(false);

const updateSW = registerSW({
  onNeedRefresh() {
    showUpdatePrompt.value = true;
  },
  onOfflineReady() {
    console.log('Offline ready');
  },
});

function reloadApp() {
  updateSW(true); // skipWaiting + reload
  showUpdatePrompt.value = false;
}

function dismissUpdate() {
  showUpdatePrompt.value = false;
}
</script>

<style scoped>
.reload-prompt {
  & :deep(.v-snackbar__wrapper) {
    border: 1px solid #8885;
    border-radius: 4px;
  }
}
</style>
