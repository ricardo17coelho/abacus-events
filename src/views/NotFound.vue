<template>
  <ContainerCentered>
    <v-empty-state
      :headline="t('not_found.headline')"
      :text="t('not_found.text')"
      :title="t('not_found.title')"
    >
      <template #actions>
        <VBtnPrimary class="self-center" :to="{ path: '/' }">
          Go home
        </VBtnPrimary>
      </template>
    </v-empty-state>
  </ContainerCentered>
</template>
<script lang="ts" setup>
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
