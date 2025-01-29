<template>
  <ContainerCentered>
    <v-empty-state
      :headline="$t('not_found.headline')"
      :title="$t('not_found.title')"
      :text="$t('not_found.text')"
    >
      <template #actions>
        <VBtnPrimary
          :to="{ path: '/' }"
          class="self-center"
        >
          Go home
        </VBtnPrimary>
      </template>
    </v-empty-state>
  </ContainerCentered>
</template>
<script lang="ts" setup>
import ContainerCentered from '@/components/containers/ContainerCentered.vue';
</script>
