<template>
  <v-text-field
    v-model="model"
    :error-messages="slugError"
    :label="t('labels.slug')"
    :rules="[slugUniqueRule]"
    v-bind="$attrs"
    @update:model-value="validateSlug"
  >
    <template #append-inner>
      <v-progress-circular
        v-if="isLoading"
        color="primary"
        indeterminate
        size="18"
        width="2"
      />
      <v-icon v-if="slugError" color="error">mdi-alert-circle</v-icon>
      <UiInfoHint
        text="The slug can be used to find the event, instead of using the UUID. Typically the slug should match the event name and be hyphenated"
      />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import UiInfoHint from '@lib/ui/components/UiInfoHint.vue';
import debounce from 'lodash/debounce';
import useApiEvents from '@/api/events.ts';
import { toast } from 'vue-sonner';

const props = defineProps({
  eventId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: String, default: '' });

const { t } = useI18n();

const slugError = ref<string | null>(null);

// Live validation rule function
const slugUniqueRule = () => {
  return slugError.value || true;
};

const { checkIfSlugAlreadyExists } = useApiEvents();

const isLoading = ref(false);
// Debounced async validator
const checkSlugExists = debounce(async (value: string) => {
  if (!value) {
    slugError.value = null;
    return;
  }

  isLoading.value = true;
  const { exists, error } = await checkIfSlugAlreadyExists(
    value,
    props.eventId,
  );
  isLoading.value = false;

  if (error) {
    console.error('Supabase error:', error);
    toast.error(t('errors.error_occurred'));
    return;
  }

  slugError.value = exists ? t('errors.slug.already_in_use') : null;
}, 500);

// Call on every input (debounced inside)
const validateSlug = (value: string) => {
  checkSlugExists(value);
};
</script>
