<template>
  <v-form
    ref="formRef"
    class="flex w-full flex-col items-start"
    @submit.prevent="emailAuth"
  >
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="credentials.data.firstname"
          :disabled="loading"
          label="Firstname"
          name="firstname"
          required
          :rules="[
            rulesValidation.ruleRequired,
            (v) => rulesValidation.ruleMinLength(v, { length: 2 }),
          ]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="credentials.data.lastname"
          :disabled="loading"
          label="Lastname"
          name="lastname"
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
    firstname: '',
    lastname: '',
  },
});

const emailLoading = ref(false);

const { signUp, login } = useAuthUser();
const formRef = ref();

async function emailAuth() {
  const { valid } = await formRef.value.validate();
  if (valid) {
    emailLoading.value = true;
    const { data, error } = await signUp(credentials.value);
    if (data.user) {
      const { data, error } = await login(credentials.value);
      if (data.user) void router.push({ name: 'dashboard' });
      else if (error) {
        toast.error(error.message);
        emailLoading.value = false;
      }
    } else if (error) {
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
    data: {
      firstname: 'Joe',
      lastname: 'Doe',
    },
  };
  nextTick(() => emailAuth());
}
</script>
