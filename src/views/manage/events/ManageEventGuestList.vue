<template>
  <ManageEventContainer v-if="currentEvent">
    <AppStateSoon />
  </ManageEventContainer>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import AppStateSoon from '@/components/app/AppStateSoon.vue';
import ManageEventContainer from '@/components/manage/ManageEventContainer.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);
</script>
