<template>
  <header>
    <h1 v-if="user" class="Title">
      <span>
        {{ i18n.t(greetingMsg) }}
      </span>
      <span v-if="userDisplayName" class="mx-2 text-grey">
        {{ userDisplayName }}
      </span>
      <span class="prevent-select" @click="randomDirection"> 🎉 </span>
      <v-chip
        v-for="currentUserRole in userRoles"
        :key="currentUserRole"
        class="ml-4"
        color="primary"
        density="compact"
      >
        {{ currentUserRole }}
      </v-chip>
    </h1>
  </header>
</template>

<script setup lang="ts">
// stores
import useConfetti from '@/composables/confetti';
import useAuthUser from '@/composables/auth-user.ts';
// composables
import { useI18n } from 'vue-i18n';

const { user, userDisplayName, userRoles } = useAuthUser();

const i18n = useI18n();
const { randomDirection } = useConfetti();

const currentTime = ref();
function timer() {
  currentTime.value = new Date();
}

const intervalTimer = ref<null | ReturnType<typeof setTimeout>>(null);

onMounted(() => {
  // start timer
  timer();
  intervalTimer.value = setInterval(timer, 1000);
});

onUnmounted(() => {
  clearInterval(intervalTimer.value);
});

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

<style>
#confetti-canvas {
  z-index: 900;
}
</style>

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
