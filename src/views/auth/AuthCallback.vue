<template>
  <AppLoader />
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import AppLoader from '@/components/app/AppLoader.vue';

const router = useRouter();
const { currentUser } = useAuthStore();

onMounted(() => {
  if (currentUser) {
    console.log(
      'arrived on callback page with an existing user, so going home'
    );
    setTimeout(() => {
      router.push({ name: 'dashboard' });
    }, 0);
  }
});
</script>
