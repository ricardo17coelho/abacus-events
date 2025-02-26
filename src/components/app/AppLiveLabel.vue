<template>
  <v-chip density="compact">
    <template #prepend>
      <v-icon class="flash" color="red" size="18" start>
        mdi-radiobox-marked
      </v-icon>
    </template>
    <span class="text-caption"> Live </span>
  </v-chip>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@keyframes flash {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}

.flash {
  animation: flash 4s infinite;
}
</style>
