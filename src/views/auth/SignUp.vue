<template>
  <AuthCard
    title="Good to have you"
    subtitle="We just need some details from you"
  >
    <AuthSignUpForm />
    <template #actions>
      <span class="text-sm">
        Already registered?
        <v-btn :to="{ name: 'auth-sign-in' }" variant="plain">
          Sign in here!
        </v-btn>
      </span>
    </template>
  </AuthCard>
</template>
<script lang="ts" setup>
import AuthCard from '@/components/auth/AuthCard.vue';
import AuthSignUpForm from '@/components/auth/AuthSignUpForm.vue';
</script>
