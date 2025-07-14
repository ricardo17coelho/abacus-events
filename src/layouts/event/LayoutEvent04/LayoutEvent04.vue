<template>
  <LayoutEventAppBar v-if="!smAndDown" />
  <v-main scrollable>
    <LayoutEvent04Mobile v-if="smAndDown" />
    <LayoutEvent04Desktop v-else />
  </v-main>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

import LayoutEvent04Mobile from '@/layouts/event/LayoutEvent04/LayoutEvent04Mobile.vue';
import LayoutEvent04Desktop from '@/layouts/event/LayoutEvent04/LayoutEvent04Desktop.vue';
import LayoutEventAppBar from '@/layouts/event/LayoutEventAppBar.vue';

const { smAndDown } = useDisplay();
</script>
