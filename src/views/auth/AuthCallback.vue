<template>
  <AppLoader />
</template>
<script lang="ts" setup>
import useAuthUser from '@/composables/auth-user.ts';
import AppLoader from '@/components/app/AppLoader.vue';

const router = useRouter();
const { isLoggedIn } = useAuthUser();

onMounted(() => {
  if (isLoggedIn.value) {
    console.log(
      'arrived on callback page with an existing user, so going home',
    );
    setTimeout(() => {
      router.push({ name: 'dashboard' });
    }, 0);
  }
});
</script>
