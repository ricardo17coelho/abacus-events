<template>
  <span v-if="formattedTime">{{ formattedTime }}</span>
</template>

<script setup lang="ts">
import { useDateCountdown } from '@/composables/countdown.ts';

const props = defineProps<{ date: string }>();
const { formattedTime } = useDateCountdown(props.date);
</script>
