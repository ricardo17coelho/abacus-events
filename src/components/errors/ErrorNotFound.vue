<template>
  <v-empty-state
    class="fill-height"
    headline="Whoops, 404"
    min-height="650"
    text="The page you were looking for does not exist"
  >
    <template #title>
      <div class="text-primary">Page not found</div>
    </template>

    <template #actions>
      <VBtnPrimary text="Home" to="/" />
    </template>
  </v-empty-state>
</template>

<script setup lang="ts"></script>

<style scoped></style>
