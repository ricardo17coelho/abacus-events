<template>
  <v-form ref="formRef">
    <v-row dense>
      <v-col>
        <DialogTitleI18n
          :i18n="model.title"
          @save="model.title = $event"
        >
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :model-value="modelValueTitleI18n"
              :label="$t('labels.name')"
              :rules="[rulesValidation.ruleRequired]"
              readonly
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
      <v-col>
        <DialogTitleI18n
          :i18n="model.note"
          @save="model.note = $event"
        >
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :model-value="modelValueNoteI18n"
              :label="$t('labels.note')"
              readonly
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-select
          v-model="model.category"
          :items="categories"
          :label="$t('labels.category')"
          name="field-category"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        v-for="(_, idx) in model.locations"
        :key="`location-field-${idx}`"
        cols="12"
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
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="model.time_start"
          :label="$t('labels.time_start')"
          hint="Format NN:NN ex: 18:00"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="model.time_end"
          :label="$t('labels.time_end')"
          hint="Format NN:NN ex: 18:00"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="model.icon"
          :label="$t('labels.icon')"
          hint="An icon from MDI"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
// utils
import { PROGRAM_TIMELINE_CATEGORY } from '@/api/types/ProgramTimeline';
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';
import rulesValidation from '@/utils/validations';
import DialogTitleI18n from '../../dialogs/DialogTitleI18n.vue';

const model = defineModel({ type: Object, default: () => ({}) });

const formRef = ref();

const categories = computed(() =>
  Object.values(PROGRAM_TIMELINE_CATEGORY).map((i) => {
    return {
      value: i,
      title: i
    };
  })
);

const modelValueTitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title)
);

const modelValueNoteI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.note)
);

defineExpose({ formRef });
</script>
