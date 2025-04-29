<template>
  <header>
    <h1 v-if="user" class="Title">
      <span>
        {{ greetingMsg }}
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

const { t } = useI18n();
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

  if (hrs >= 4 && hrs < 12) return t('greeting.good-morning');
  else if (hrs >= 11 && hrs < 17) return t('greeting.good-afternoon');
  else if (hrs >= 17 && hrs < 23) return t('greeting.good-evening');
  else return t('greeting.hello');
});
</script>

<style>
#confetti-canvas {
  z-index: 900;
}
</style>
