<template>
  <v-container v-if="currentEvent">
    <VCardSettings rounded="lg" title="Colors">
      <v-card-item>
        <v-menu :close-on-content-click="false" z-index="2501">
          <template #activator="{ props: ActivatorProps }">
            <v-btn color="primary" v-bind="ActivatorProps">
              Primary Color
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-color-picker
                :model-value="currentEvent.brand?.color_primary"
                @update:model-value="
                  onUpdateCompanyBrandDebounced({ color_primary: $event })
                "
              ></v-color-picker>
            </v-card-text>
          </v-card>
        </v-menu>
        <v-menu :close-on-content-click="false" z-index="2501">
          <template #activator="{ props: ActivatorProps }">
            <v-btn v-bind="ActivatorProps" class="ml-2" color="secondary">
              Secondary Color
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-color-picker
                :model-value="currentEvent.brand?.color_secondary"
                @update:model-value="
                  onUpdateCompanyBrandDebounced({
                    color_secondary: $event,
                  })
                "
              ></v-color-picker>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-card-item>
    </VCardSettings>
  </v-container>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type { EventBrand } from '@/api/types/Event.ts';
import useApi from '@/composables/api.ts';
import { toast } from 'vue-sonner';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { addOrUpdate } = useApi();

async function onUpdateCompanyBrand(data: Partial<EventBrand>) {
  const { error } = await addOrUpdate('event_brand', {
    ...data,
    event_id: currentEvent.value?.id,
  });

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (currentEvent.value?.brand) {
      currentEvent.value.brand = {
        ...currentEvent.value.brand,
        color_primary: data.color_primary,
        color_secondary: data.color_secondary,
      };
    }
    toast.success('Brand updated!');
  }
}

const onUpdateCompanyBrandDebounced = useDebounceFn(
  (data: Partial<EventBrand>) => {
    onUpdateCompanyBrand(data);
  },
  1000,
);
</script>
