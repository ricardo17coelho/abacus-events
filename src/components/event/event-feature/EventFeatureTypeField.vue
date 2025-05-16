<template>
  <v-select
    :items="items"
    :label="t('event.feature')"
    name="field-event-feature-type"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import {
  EVENT_FEATURE_TYPE,
  type EventFeatureTypes,
} from '@/api/types/EventFeature.ts';

const props = defineProps({
  disabledFeaturesTypes: {
    type: Array as PropType<EventFeatureTypes[]>,
    default: () => [],
  },
});

const { t } = useI18n();

const items = computed(() =>
  Object.values(EVENT_FEATURE_TYPE).map((i) => {
    return {
      value: i,
      title: t(`labels.features.${i}`),
      props: {
        disabled: i === 'GUEST_LIST' || props.disabledFeaturesTypes.includes(i),
        slim: true,
        prependIcon: getIcon(i),
        color: 'primary',
      },
    };
  }),
);

function getIcon(i: EventFeatureTypes) {
  switch (i) {
    case 'CONTACTS':
      return 'mdi-phone';
    case 'FILES':
      return 'mdi-file-multiple';
    case 'GUEST_LIST':
      return 'mdi-account-multiple';
    case 'PARKING':
      return 'mdi-car';
    case 'PROGRAM':
      return 'mdi-list-box';
    case 'SCHEDULE':
      return 'mdi-bus';
  }
}
</script>
