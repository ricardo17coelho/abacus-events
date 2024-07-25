<template>
  <AuthCard title="Reset Password" subtitle="Choose a new password below">
    <v-form class="flex w-full flex-col items-start" @submit.prevent="onSubmit">
      <FieldPassword
        id="password"
        v-model="password"
        :disabled="loading"
        class="mb-4 w-full"
        name="password"
        label="Password"
        placeholder="Choose your password"
      />

      <v-row dense>
        <v-col align="end">
          <VBtnPrimary :loading="loading" type="submit" class="bg-teal-700">
            Reset
          </VBtnPrimary>
        </v-col>
      </v-row>
    </v-form>
  </AuthCard>
</template>

<script lang="ts" setup>
import FieldPassword from '@/components/fields/FieldPassword.vue';
import AuthCard from '@/components/auth/AuthCard.vue';
import { toast } from 'vue-sonner';
import useAuthUser from '@/composables/auth-user';

const router = useRouter();

const password = ref('');
const loading = ref(false);

const { update } = useAuthUser();
async function onSubmit() {
  loading.value = true;
  const { error, data } = await update({
    password: password.value
  });
  console.log(error, data);

  if (error) {
    toast.error(error.message);
  } else {
    toast.success('successfully reset password.');
    router.push({ name: 'dashboard' });
  }
  loading.value = false;
}
</script>
