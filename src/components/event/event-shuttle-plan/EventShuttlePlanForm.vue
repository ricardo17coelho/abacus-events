<template>
  <v-form ref="formRef"
    ><v-row dense>
      <v-col>
        <v-switch
          v-model="model.direction"
          false-value="OUTWARD"
          :label="
            model.direction === 'OUTWARD'
              ? t('labels.shuttle_plan_direction.return')
              : t('labels.shuttle_plan_direction.outward')
          "
          true-value="RETURN"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.location"
          :label="t('labels.location_name')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model="model.location_link"
          :label="t('labels.location_link')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field v-model="model.order" :label="t('labels.order')" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// utils
import { useI18n } from 'vue-i18n';

const model = defineModel({ type: Object, default: () => ({}) });

const { t } = useI18n();

const formRef = ref();

defineExpose({ formRef });
</script>
