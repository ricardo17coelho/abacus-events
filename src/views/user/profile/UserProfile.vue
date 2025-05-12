<template>
  <Page>
    <PageHeading title="Settings">
      <template #extension>
        <v-tabs color="primary" density="compact" hide-slider>
          <v-tab
            v-for="(item, i) in items"
            :key="i"
            class="me-2"
            exact
            rounded="lg"
            :text="item.text"
            :to="item.to"
            :value="item.value"
            variant="tonal"
          />
        </v-tabs>
      </template>
    </PageHeading>

    <PageContent>
      <router-view />
    </PageContent>
  </Page>
</template>

<script setup lang="ts">
import { Page, PageContent, PageHeading } from '@/components/page';

const items = [
  {
    text: 'Account',
    value: 'account',
    to: { name: 'profile-account' },
  },
  {
    text: 'Settings',
    value: 'settings',
    to: { name: 'profile-settings' },
  },
];
</script>
