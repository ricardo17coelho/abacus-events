<template>
  <header>
    <h1 v-if="currentUser" class="Title">
      <span>
        {{ i18n.t(greetingMsg) }}
      </span>
      <span v-if="currentUserDisplayName">
        {{ currentUserDisplayName }}
      </span>
      <v-chip
        v-for="currentUserRole in currentUserRoles"
        :key="currentUserRole"
        color="primary"
        density="compact"
        class="ml-4"
      >
        {{ currentUserRole }}
      </v-chip>
    </h1>
  </header>
</template>

<script setup lang="ts">
// stores
import { useAuthStore } from '@/stores/auth';
// composables
import { useI18n } from 'vue-i18n';

const { currentUser, currentUserDisplayName, currentUserRoles } =
  useAuthStore();

const i18n = useI18n();

const currentTime = ref();
function timer() {
  currentTime.value = new Date();
}
timer();
setInterval(timer, 1000);

const greetingMsg = computed(() => {
  const hrs = currentTime.value?.getHours();
  let greet = '';

  if (hrs >= 4 && hrs < 12) greet += 'good-morning';
  else if (hrs >= 11 && hrs < 17) greet += 'good-afternoon';
  else if (hrs >= 17 && hrs < 23) greet += 'good-evening';
  else greet += 'hello';

  return greet;
});
</script>

<i18n lang="json">
{
  "de": {
    "good-morning": "Guten Morgen",
    "good-afternoon": "Guten Tag",
    "good-evening": "Guten Abend",
    "hello": "Hallo"
  },
  "en": {
    "good-morning": "Good Morning",
    "good-afternoon": "Good Afternoon",
    "good-evening": "Good Evening",
    "hello": "Hello"
  },
  "fr": {
    "good-morning": "Bonjour",
    "good-afternoon": "Bon après-midi",
    "good-evening": "Bonsoir",
    "hello": "Salut"
  },
  "it": {
    "good-morning": "Buongiorno",
    "good-afternoon": "Buon pomeriggio",
    "good-evening": "Buona sera",
    "hello": "Ciao"
  }
}
</i18n>
