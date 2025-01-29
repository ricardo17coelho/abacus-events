<template>
  <v-container
    class="fill-height"
    fluid
    v-bind="$attrs"
  >
    <v-row
      align="center"
      justify="center"
      class="fill-height"
    >
      <slot />
    </v-row>
  </v-container>
</template>
