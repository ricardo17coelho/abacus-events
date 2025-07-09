<template>
  <v-container
    v-if="currentEvent && feature && currentEvent.files.length"
    class="px-0"
  >
    <LayoutEvent04MobileTitle
      :prepend-icon="feature.icon"
      :title="
        showDefaultTranslationOrEmpty(feature.title) ??
        t(`labels.features.${feature.feature_id}`)
      "
    />

    <v-list>
      <v-list-item
        v-for="contact in currentEvent.contacts"
        :key="contact.id"
        class="px-0"
        density="compact"
        :href="getContactHREF(contact)"
        :subtitle="contact.value"
        :title="contact.description"
      >
        <template #prepend>
          <v-avatar color="surface-light" :size="48">
            <v-icon color="primary">
              {{ getContactIcon(contact.type) }}
            </v-icon>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { getEventFeatureIfExists } from '@/utils/event-features.ts';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty.ts';
import LayoutEvent04MobileTitle from '@/layouts/event/LayoutEvent04/mobile/LayoutEvent04MobileTitle.vue';
import { useI18n } from 'vue-i18n';
import useContact from '@/composables/contact.ts';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { t } = useI18n();

const feature = computed(() =>
  currentEvent.value
    ? getEventFeatureIfExists(currentEvent.value, 'CONTACTS')
    : undefined,
);

const { getContactHREF, getContactIcon } = useContact();
</script>
