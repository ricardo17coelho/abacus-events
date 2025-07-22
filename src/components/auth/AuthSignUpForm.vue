<template>
  <div class="w-full">
    <v-form
      v-if="!emailVerificationPending"
      ref="formRef"
      class="flex w-full flex-col items-start"
      @submit.prevent="emailAuth"
    >
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="credentials.data.first_name"
            :disabled="loading"
            label="Firstname"
            name="first_name"
            required
            :rules="[
              rulesValidation.ruleRequired,
              (v) => rulesValidation.ruleMinLength(v, { length: 2 }),
            ]"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="credentials.data.last_name"
            :disabled="loading"
            label="Lastname"
            name="last_name"
            required
            :rules="[
              rulesValidation.ruleRequired,
              (v) => rulesValidation.ruleMinLength(v, { length: 2 }),
            ]"
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model="credentials.email"
            :disabled="loading"
            label="Email"
            name="email"
            placeholder="Enter your email"
            required
            :rules="[rulesValidation.ruleRequired, rulesValidation.ruleEmail]"
            type="email"
          />
        </v-col>
        <v-col cols="12">
          <FieldPassword
            v-model="credentials.password"
            class="mb-4 w-full"
            :disabled="loading"
            label="Password"
            name="password"
            placeholder="Choose a password"
            required
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col v-if="isDevEnv()" cols="12" sm="6">
          <VBtnDev
            :block="isDisplayXs"
            prepend-icon="mdi-bug"
            @click="onBtnDevClick"
          >
            Auto DEV Sign Up
          </VBtnDev>
        </v-col>
        <v-col align="end" cols="12" :sm="isDevEnv() ? 6 : undefined">
          <VBtnPrimary
            :block="isDisplayXs"
            :disabled="loading"
            :loading="emailLoading"
            type="submit"
          >
            {{ 'Sign Up' }}
          </VBtnPrimary>
        </v-col>
      </v-row>
    </v-form>
    <v-container v-else class="text-center py-12">
      <v-icon color="primary" size="64">mdi-email-check-outline</v-icon>
      <h2 class="text-h5 mt-4 mb-2">Verify your email</h2>
      <p class="text-body-1 mb-6">
        We've sent a confirmation link to
        <strong>{{ credentials.email }}</strong
        >.<br />
        Please check your inbox and verify your email to continue.
      </p>
      <v-btn
        :loading="resendLoading"
        variant="tonal"
        @click="onResendVerificationEmail"
      >
        Resend Email
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import FieldPassword from '@/components/fields/FieldPassword.vue';
import { isDevEnv } from '@/utils';
import { toast } from 'vue-sonner';
import { useDisplay } from 'vuetify';
import useAuthUser from '@/composables/auth-user';
import rulesValidation from '@/utils/validations';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const display = useDisplay();
const { t } = useI18n();

const isDisplayXs = computed(() => display.xs.value);

const credentials = ref({
  email: '',
  password: '',
  data: {
    first_name: '',
    last_name: '',
  },
});

const emailLoading = ref(false);
const resendLoading = ref(false);
const emailVerificationPending = ref(false);

const { signUp, login, resendVerificationEmail } = useAuthUser();
const formRef = ref();

const loading = computed(() => emailLoading.value);

async function emailAuth() {
  const { valid } = await formRef.value.validate();
  if (!valid) {
    toast.error(t('errors.validation.invalid'));
    return;
  }

  emailLoading.value = true;

  const { data: signUpData, error: signUpError } = await signUp(
    credentials.value,
  );

  if (signUpError) {
    toast.error(signUpError.message);
    emailLoading.value = false;
    return;
  }

  if (signUpData.user) {
    const isConfirmed =
      !!signUpData.user.confirmed_at || !!signUpData.user.email_confirmed_at;

    if (!isConfirmed) {
      toast.success('Account created. Please verify your email.');
      emailVerificationPending.value = true;
      emailLoading.value = false;
      return;
    }

    const { data: loginData, error: loginError } = await login(
      credentials.value,
    );

    if (loginError) {
      toast.error(loginError.message);
    } else if (loginData.user) {
      void router.push({ name: 'manage' });
    }
    emailLoading.value = false;
  }
}

async function onResendVerificationEmail() {
  resendLoading.value = true;

  const { error } = await resendVerificationEmail(credentials.value.email);

  if (error) {
    toast.error(error.message);
  } else {
    toast.success('Verification email resent.');
  }

  resendLoading.value = false;
}

function onBtnDevClick() {
  credentials.value = {
    email: import.meta.env.VITE_DEV_USER_EMAIL,
    password: import.meta.env.VITE_DEV_USER_PW,
    data: {
      first_name: 'Joe',
      last_name: 'Doe',
    },
  };
  nextTick(() => emailAuth());
}
</script>
