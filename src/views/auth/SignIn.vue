<template>
  <AuthCard
    title="Welcome back"
    subtitle="Please enter your details"
  >
    <AuthSignInForm />
    <template
      v-if="isAuthSignUpEnabled"
      #actions
    >
      <span class="text-sm">
        Don't have an account?
        <v-btn
          :to="{ name: 'auth-sign-up' }"
          variant="plain"
        >
          Sign up here!
        </v-btn>
      </span>
    </template>
  </AuthCard>
</template>
<script lang="ts" setup>
import AuthCard from '@/components/auth/AuthCard.vue';
import AuthSignInForm from '@/components/auth/AuthSignInForm.vue';

const isAuthSignUpEnabled =
  import.meta.env.VITE_AUTH_SIGN_UP_ENABLED === 'true';
</script>
