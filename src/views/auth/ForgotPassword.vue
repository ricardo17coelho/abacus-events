<template>
  <AuthCard subtitle="Let's sort that for you" title="Lost your password?">
    <v-form class="flex w-full flex-col items-start" @submit.prevent="onSubmit">
      <v-text-field
        v-model="email"
        class="w-full"
        :disabled="loading"
        label="Email"
        name="email"
        placeholder="Enter your email"
        required
        type="email"
      />

      <v-row>
        <v-col align="end">
          <VBtnPrimary :loading="loading" type="submit"> Reset </VBtnPrimary>
        </v-col>
      </v-row>
    </v-form>

    <template #actions>
      <span class="text-sm">
        Do u want to sign in?
        <v-btn :to="{ name: 'auth-sign-in' }" variant="plain"> Sign in </v-btn>
      </span>
    </template>
  </AuthCard>
</template>
<script lang="ts" setup>
import AuthCard from '@/components/auth/AuthCard.vue';
import useAuthUser from '@/composables/auth-user';
import { toast } from 'vue-sonner';

const { sendPasswordRestEmail } = useAuthUser();
const email = ref('');
const loading = ref(false);
async function onSubmit() {
  loading.value = true;

  const { data, error } = await sendPasswordRestEmail(email.value, {
    redirectTo: `${window.location.origin}/auth/resetpassword`,
  });
  if (data) {
    toast.success('Please follow the link in your email');
  } else if (error) {
    toast.error(error.message);
  }
  loading.value = false;
}
</script>
