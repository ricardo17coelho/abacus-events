<template>
  <v-form
    ref="formRef"
    class="flex w-full flex-col items-start"
    @submit.prevent="emailAuth"
  >
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          id="email"
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
          id="password"
          v-model="credentials.password"
          class="mb-4 w-full"
          :disabled="loading"
          label="Password"
          name="password"
          placeholder="Enter your password"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" sm="6">
        <v-btn
          :block="isDisplayXs"
          :to="{ name: 'auth-forgot-password' }"
          variant="text"
        >
          Forgot your password?
        </v-btn>
      </v-col>
      <v-col align="end" cols="12" sm="6">
        <VBtnPrimary
          :block="isDisplayXs"
          :disabled="loading"
          :loading="emailLoading"
          type="submit"
        >
          {{ 'Sign In' }}
        </VBtnPrimary>
      </v-col>
      <v-col v-if="isDevEnv()" cols="12">
        <VBtnDev
          :block="isDisplayXs"
          prepend-icon="mdi-bug"
          @click="onBtnDevClick"
        >
          Auto DEV Sign In
        </VBtnDev>
      </v-col>
    </v-row>
  </v-form>
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
});

const emailLoading = ref(false);

const { login } = useAuthUser();
const formRef = ref();

async function emailAuth() {
  const { valid } = await formRef.value.validate();
  if (valid) {
    emailLoading.value = true;
    const { data, error } = await login(credentials.value);
    if (data.user) void router.push({ name: 'dashboard' });
    else if (error) {
      toast.error(error.message);
      emailLoading.value = false;
    }
  } else {
    toast.error(t('errors.validation.invalid'));
  }
}

const loading = computed(() => emailLoading.value);

function onBtnDevClick() {
  credentials.value = {
    email: import.meta.env.VITE_DEV_USER_EMAIL,
    password: import.meta.env.VITE_DEV_USER_PW,
  };
  nextTick(() => emailAuth());
}
</script>
