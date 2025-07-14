<template>
  <v-app-bar class="px-1" flat>
    <TheLayoutContainer>
      <TheAppBarLogo />

      <TheManageBtn />
      <v-spacer />
      <div
        class="d-flex"
        :class="{
          'ga-1': xs,
          'ga-5': smAndUp,
        }"
      >
        <TheAppMenuLanguage />
      </div>
      <TheUserMenu />
    </TheLayoutContainer>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import TheLayoutContainer from '@/layouts/components/TheLayoutContainer.vue';
import TheAppMenuLanguage from '@/components/TheAppMenuLanguage.vue';
import TheUserMenu from '@/layouts/components/TheUserMenu.vue';
import TheManageBtn from '@/layouts/components/TheManageBtn.vue';
import TheAppBarLogo from '@/layouts/components/TheAppBarLogo.vue';

const { xs, smAndUp } = useDisplay();
</script>
