<template>
  <v-form
    ref="formRef"
    class="flex w-full flex-col items-start"
    @submit.prevent="emailAuth"
  >
    <v-row dense>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="credentials.data.firstname"
          required
          :disabled="loading"
          label="Firstname"
          name="firstname"
          :rules="[
            rulesValidation.ruleRequired,
            (v) => rulesValidation.ruleMinLength(v, { length: 2 })
          ]"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="credentials.data.lastname"
          required
          :disabled="loading"
          label="Lastname"
          name="lastname"
          :rules="[
            rulesValidation.ruleRequired,
            (v) => rulesValidation.ruleMinLength(v, { length: 2 })
          ]"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="credentials.email"
          required
          :disabled="loading"
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          :rules="[rulesValidation.ruleRequired, rulesValidation.ruleEmail]"
        />
      </v-col>
      <v-col cols="12">
        <FieldPassword
          v-model="credentials.password"
          :disabled="loading"
          required
          class="mb-4 w-full"
          name="password"
          label="Password"
          placeholder="Choose a password"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        v-if="isDevEnv()"
        cols="12"
        sm="6"
      >
        <VBtnDev
          prepend-icon="mdi-bug"
          :block="isDisplayXs"
          @click="onBtnDevClick"
        >
          Auto DEV Sign Up
        </VBtnDev>
      </v-col>
      <v-col
        cols="12"
        :sm="isDevEnv() ? 6 : undefined"
        align="end"
      >
        <VBtnPrimary
          :loading="emailLoading"
          :disabled="loading"
          type="submit"
          :block="isDisplayXs"
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
    lastname: ''
  }
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
      lastname: 'Doe'
    }
  };
  nextTick(() => emailAuth());
}
</script>
