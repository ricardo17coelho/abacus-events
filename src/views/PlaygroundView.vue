<template>
  <UiDateTimePicker v-model="date" />

  Playground Model: {{ date }}
</template>

<script setup lang="ts">
import { UiDateTimePicker } from '@lib/ui/components';

const date = ref(new Date().toISOString());
</script>
