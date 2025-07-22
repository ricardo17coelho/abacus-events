<template>
  <router-view v-if="isUserAdminOrHelper" />
  <ErrorNotFound v-else />
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
// components
import ErrorNotFound from '@/components/errors/ErrorNotFound.vue';
// composables
import useAuthUser from '@/composables/auth-user.ts';
import type { Event } from '@/api/types/Event';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys';

const currentEvent = ref<Event>();
provide(CURRENT_EVENT_KEY, currentEvent);

const { isUserAdminOrHelper } = useAuthUser();
</script>
