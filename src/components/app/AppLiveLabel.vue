<template>
  <v-chip density="compact">
    <template #prepend>
      <v-icon start class="flash" size="18" color="red">
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
