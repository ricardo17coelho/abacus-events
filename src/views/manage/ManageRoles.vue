<template>
  <Page>
    <PageHeading title="Roles" />
    <PageContent>
      <UiTable :headers="headers" subtitle="A list of all roles." title="Roles">
      </UiTable>
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page';
import { UiTable } from '@lib/ui';

const headers = ref([{ title: '', key: 'role' }]);
</script>
