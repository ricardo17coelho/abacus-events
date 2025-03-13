<template>
  <Page>
    <PageHeading title="Users" />
    <PageContent>
      <UiTable
        :headers="headers"
        :items="users"
        subtitle="A list of all users."
        title="Users"
      >
        <template #[`item.user`]="{ item }">
          <v-avatar color="surface-light" size="36">
            {{ getInitials(getUserFullName(item)) }}
          </v-avatar>
          {{ getUserFullName(item) }}
        </template>
      </UiTable>
    </PageContent>
  </Page>
</template>
<script lang="ts" setup>
import { Page, PageContent, PageHeading } from '@/components/page';
import { useI18n } from 'vue-i18n';
import { UiTable } from '@lib/ui';
import { toast } from 'vue-sonner';
import type { Profile } from '@/api/types/Profile.ts';
import useApiProfiles from '@/api/profiles.ts';
import { getInitials } from '@/utils/initials.ts';
import { getUserFullName } from '@/utils/profile.ts';

const { t } = useI18n();

const headers = ref([{ title: '', key: 'user' }]);

const users = ref<Profile[]>([]);

const { getProfiles } = useApiProfiles();

const fetchData = async () => {
  const { data, error } = await getProfiles();
  if (error) {
    toast.error(t('errors.error_occurred'));
    return;
  }
  if (data) {
    users.value = data;
  }
};
fetchData();
</script>
