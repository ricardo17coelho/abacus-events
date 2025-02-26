<template>
  <AuthCard subtitle="Choose a new password below" title="Reset Password">
    <v-form class="flex w-full flex-col items-start" @submit.prevent="onSubmit">
      <FieldPassword
        id="password"
        v-model="password"
        class="mb-4 w-full"
        :disabled="loading"
        label="Password"
        name="password"
        placeholder="Choose your password"
      />

      <v-row dense>
        <v-col align="end">
          <VBtnPrimary class="bg-teal-700" :loading="loading" type="submit">
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

const { updateUser } = useAuthUser();
async function onSubmit() {
  loading.value = true;
  const { error, data } = await updateUser({
    password: password.value,
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
