<template>
  <v-select
    :items="items"
    :label="t('labels.contact')"
    name="field-event-contact-type"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { EVENT_CONTACT_TYPES } from '@/api/types/EventContact.ts';
import useContact from '@/composables/contact.ts';

const { t } = useI18n();
const { getContactIcon } = useContact();

const items = computed(() =>
  Object.values(EVENT_CONTACT_TYPES).map((i) => {
    return {
      value: i,
      title: t(`labels.contact_types.${i}`),
      props: {
        slim: true,
        prependIcon: getContactIcon(i),
        color: 'primary',
      },
    };
  }),
);
</script>
