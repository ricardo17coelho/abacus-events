<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.title"
          :label="$t('labels.name')"
          :rules="[rulesValidation.ruleRequired]"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="model.note" :label="$t('labels.note')">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="12"
        v-for="(_, idx) in model.locations"
        :key="`location-field-${idx}`"
      >
        <v-text-field
          v-model="model.locations[idx]"
          :label="`${$t('labels.location')} ${idx + 1}`"
        >
          <template #append>
            <v-btn
              v-if="
                model.locations.length === 0 ||
                idx === model.locations.length - 1
              "
              slim
              size="small"
              @click="model.locations.push('')"
            >
              +
            </v-btn>
            <v-btn
              v-if="model.locations.length > 1"
              slim
              size="small"
              @click="model.locations.splice(idx, 1)"
            >
              -
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="model.time_start"
          :label="$t('labels.time_start')"
          hint="Format NN:NN ex: 18:00"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="model.time_end"
          :label="$t('labels.time_end')"
          hint="Format NN:NN ex: 18:00"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="model.icon"
          :label="$t('labels.icon')"
          hint="An icon from MDI"
        >
        </v-text-field>
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
