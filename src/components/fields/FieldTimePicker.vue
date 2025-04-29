<template>
  <v-text-field
    v-model="time"
    :active="dialog"
    :focused="dialog"
    label="Picker in dialog"
    prepend-icon="mdi-clock-time-four-outline"
    readonly
  >
    <v-dialog v-model="dialog" activator="parent" width="auto">
      <v-time-picker v-if="dialog" v-model="time" format="24hr" />
    </v-dialog>
  </v-text-field>
</template>

<script setup lang="ts">
const time = defineModel({ type: String, default: undefined });
const dialog = defineModel('dialog', { type: Boolean, default: false });
</script>
