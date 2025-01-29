<template>
  <v-menu
    location="bottom"
    color="primary"
  >
    <template #activator="{ props: ActivatorProps }">
      <v-btn
        v-bind="ActivatorProps"
        :icon="$vuetify.display.xs ? 'mdi-logout' : undefined"
        :size="$vuetify.display.xs ? 'small' : undefined"
      >
        <span
          v-if="hideFullText"
          class="text-uppercase"
        >
          {{ model ? model.slice(0, 2) : '' }}
        </span>
        <span v-else>
          {{ getLanguageTextByIsoCode(model) }}
        </span>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="item in availableLocales"
        :key="item"
        link
        color="primary"
        @click="model = item"
      >
        <v-list-item-title>
          {{ getLanguageTextByIsoCode(item) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue';

defineProps({
  availableLocales: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  hideIcon: {
    type: Boolean,
    default: false
  },
  hideFullText: {
    type: Boolean,
    default: false
  }
});

const model = defineModel({ type: String, required: true });

function getLanguageTextByIsoCode(isoCode: string) {
  switch (isoCode) {
    case 'de':
      return 'Deutsch';
    case 'en':
      return 'English';
    case 'fr':
      return 'Français';
    case 'it':
      return 'Italiano';
    default:
      return '';
  }
}
</script>
