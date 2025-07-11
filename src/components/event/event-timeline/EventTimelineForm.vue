<template>
  <v-form v-if="model" ref="formRef">
    <v-row dense>
      <v-col>
        <DialogTitleI18n :i18n="model.title" @save="model.title = $event">
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :label="t('labels.name')"
              :model-value="modelValueTitleI18n"
              readonly
              :rules="[rulesValidation.ruleRequired]"
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
      <v-col>
        <DialogTitleI18n :i18n="model.note" @save="model.note = $event">
          <template #activator="{ props: activatorProps }">
            <v-text-field
              :label="t('labels.note')"
              :model-value="modelValueNoteI18n"
              readonly
              v-bind="activatorProps"
            />
          </template>
        </DialogTitleI18n>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <EventTimelineCategoriesField
          v-model="model.category"
          chips
          :event-id="eventId"
          :label="t('labels.category')"
          name="field-category"
          :rules="[rulesValidation.ruleRequired]"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <EventTimelineLocationsField
        v-model="model.locations"
        :event-id="eventId"
        :label="t('labels.location')"
        multiple
      />
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <FieldTimePicker
          v-model="model.time_start"
          hint="Format NN:NN ex: 18:00"
          :label="t('labels.time_start')"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <FieldTimePicker
          v-model="model.time_end"
          hint="Format NN:NN ex: 18:00"
          :label="t('labels.time_end')"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6">
        <FieldIconMdi v-model="model.icon" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <br />
        <EventPersonFieldSelect
          v-model="model.persons"
          clearable
          :event-id="eventId"
          multiple
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import type { EventTimeline } from '@/api/types/EventTimeline.ts';

export const DEFAULT_FORM = {
  title: {},
  note: {},
  category: undefined,
  locations: [] as string[],
  time_start: '',
  time_end: '',
  icon: '',
  persons: [] as string[],
};

export type EventTimelineFormModel = Pick<
  EventTimeline,
  | 'title'
  | 'locations'
  | 'time_start'
  | 'time_end'
  | 'note'
  | 'icon'
  | 'category'
  | 'persons'
>;
</script>
<script lang="ts" setup>
// utils
import { showDefaultTranslationOrEmpty } from '@/utils/showDefaultTranslationOrEmpty';
import rulesValidation from '@/utils/validations';
import DialogTitleI18n from '@/components/dialogs/DialogTitleI18n.vue';
import EventTimelineCategoriesField from '@/components/event/event-timeline/event-timeline-categories/EventTimelineCategoriesField.vue';
import { useI18n } from 'vue-i18n';
import FieldIconMdi from '@/components/fields/FieldIconMdi.vue';
import FieldTimePicker from '@/components/fields/FieldTimePicker.vue';
import EventPersonFieldSelect from '@/components/event/event-persons/EventPersonFieldSelect.vue';
import EventTimelineLocationsField from '@/components/event/event-timeline/event-timeline-locations/EventTimelineLocationsField.vue';

defineProps({
  eventId: {
    type: String,
    required: true,
  },
});

const model = defineModel({
  type: Object as PropType<EventTimelineFormModel>,
  default: () => ({ ...DEFAULT_FORM }),
});

const { t } = useI18n();

const formRef = ref();

const modelValueTitleI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.title),
);

const modelValueNoteI18n = computed(() =>
  showDefaultTranslationOrEmpty(model.value?.note),
);

defineExpose({ formRef });
</script>
