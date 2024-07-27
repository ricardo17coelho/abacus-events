<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.name"
          label="Name"
          :rules="[rulesValidation.ruleRequired]"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.location"
          label="Location"
          :rules="[rulesValidation.ruleRequired]"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-number-input
          v-model="model.total_slots"
          label="Total Slots"
          :rules="[rulesValidation.ruleRequired]"
          control-variant="stacked"
          variant="outlined"
          :min="0"
          inset
        ></v-number-input>
      </v-col>
      <v-col cols="12" sm="6">
        <v-number-input
          type="number"
          v-model="model.filled_slots"
          label="Filled Slots"
          control-variant="stacked"
          variant="outlined"
          :min="0"
          inset
        ></v-number-input>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// utils
import rulesValidation from '@/utils/validations';

const model = defineModel({ type: Object, default: () => ({}) });

const formRef = ref();

defineExpose({ formRef });
</script>
