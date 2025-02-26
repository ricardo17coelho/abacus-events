<template>
  <Page>
    <PageHeading title="Users">
      <template #actions></template>
    </PageHeading>
    <PageContent>
      <WidgetUsers />
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page/';
import WidgetUsers from '@/components/manage/widgets/WidgetUsers.vue';
</script>
