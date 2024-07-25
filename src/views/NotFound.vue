<template>
  <ContainerCentered>
    <v-empty-state
      headline="Whoops, 404"
      title="Page not found"
      text="The page you were looking for does not exist"
    >
      <template #actions>
        <VBtnPrimary :to="{  path: '/' }" class="self-center">
          Go home
        </VBtnPrimary>
      </template>
    </v-empty-state>
  </ContainerCentered>
</template>
<script lang="ts" setup>
import ContainerCentered from '@/components/containers/ContainerCentered.vue';

</script>
