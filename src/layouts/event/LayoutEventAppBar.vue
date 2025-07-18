<template>
  <v-app-bar class="px-1" flat>
    <v-container class="d-flex align-center py-0 app-container">
      <TheAppBarLogo />
      <TheManageBtn />
      <v-spacer />
      <div
        class="d-flex"
        :class="{
          'ga-1': xs,
          'ga-5': smAndUp,
        }"
      >
        <UiMenu
          v-if="currentEventContactsFormatted.length"
          :items="currentEventContactsFormatted"
        >
          <template #activator="{ props }">
            <v-btn icon="mdi-phone-alert" v-bind="props"></v-btn>
          </template>
        </UiMenu>
      </div>
      <TheAppMenuLanguage />
      <TheUserMenu />
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { type MenuItem, UiMenu } from '@lib/ui';
import TheAppMenuLanguage from '@/components/TheAppMenuLanguage.vue';
import useContact from '@/composables/contact.ts';
import TheUserMenu from '@/layouts/components/TheUserMenu.vue';
import TheManageBtn from '@/layouts/components/TheManageBtn.vue';
import TheAppBarLogo from '@/layouts/components/TheAppBarLogo.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { xs, smAndUp } = useDisplay();
const { getContactHREF, getContactIcon } = useContact();

const currentEventContactsFormatted = computed((): MenuItem[] => {
  if (!currentEvent.value?.contacts) return [];

  return currentEvent.value.contacts.map((contact) => {
    return {
      title: contact.description,
      key: contact.id,
      prepend: {
        icon: getContactIcon(contact.type),
      },
      href: getContactHREF(contact),
    };
  });
});
</script>
