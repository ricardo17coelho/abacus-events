<template>
  <v-menu v-model="modelMenu" :close-on-content-click="false" z-index="2501">
    <template #activator="{ props: ActivatorProps }">
      <v-btn :color="color || model" v-bind="ActivatorProps">
        {{ label }}
      </v-btn>
    </template>
    <v-card>
      <v-card-item>
        <AppColorPicker v-model="model"></AppColorPicker>
      </v-card-item>

      <v-card-actions>
        <v-btn @click="model = ''">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import AppColorPicker from '@/components/app/AppColorPicker.vue';

defineProps({
  label: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({
  type: String as PropType<string | undefined>,
  default: undefined,
});
const modelMenu = defineModel('menu', { type: Boolean, default: false });
</script>
