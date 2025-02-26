<template>
  <Page>
    <PageHeading title="Events">
      <template #actions>
        <EventDialog v-if="isUserAdmin">
          <template #activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              prepend-icon="mdi-plus"
              variant="text"
            >
              {{ t('labels.add') }}
            </v-btn>
          </template>
        </EventDialog>
      </template>
    </PageHeading>
    <PageContent>
      <WidgetEvents />
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page/';
import WidgetEvents from '@/components/manage/widgets/WidgetEvents.vue';
import EventDialog from '@/components/event/event/EventDialog.vue';
import useAuthUser from '@/composables/auth-user.ts';
import { useI18n } from 'vue-i18n';

const { isUserAdmin } = useAuthUser();
const { t } = useI18n();
</script>
