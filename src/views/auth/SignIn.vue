<template>
  <AuthCard title="Welcome back" subtitle="Please enter your details">
    <AuthSignInForm />
    <!-- <AuthProviders /> -->
    <template #actions>
      <span class="text-sm">
        Don't have an account?
        <v-btn :to="{ name: 'auth-sign-up' }" variant="plain">
          Sign up here!
        </v-btn>
      </span>
    </template>
  </AuthCard>
</template>
<script lang="ts" setup>
import AuthCard from '@/components/auth/AuthCard.vue';
// import AuthProviders from '@/components/auth/AuthProviders.vue';
import AuthSignInForm from '@/components/auth/AuthSignInForm.vue';
</script>
