<template>
  <AppDialog
    v-model="model"
    :title="$t('labels.program_timeline')"
    max-width="600"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #content>
      <ProgramTimelineForm v-model="form" ref="formRef" />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ $t('buttons.save') }}
      </VBtnPrimary>
    </template>
  </AppDialog>
</template>

<script setup lang="ts">
// components
import AppDialog from '@/components/app/AppDialog.vue';
import ProgramTimelineForm from './ProgramTimelineForm.vue';
// api's
import useApiProgramTimeline from '@/api/program-timeline';
// types & constants
import type {
  ProgramTimeline,
  ProgramTimelineCategory
} from '@/api/types/ProgramTimeline';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
// utils
import { merge2ObjectsIfKeysExists } from '@/utils/merge';
import type { PropType } from 'vue';
import { clone } from '@/utils/clone';

const props = defineProps({
  programTimetableId: {
    type: String,
    default: undefined
  },
  category: {
    type: String as PropType<ProgramTimelineCategory>,
    required: true
  }
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t, locale } = useI18n();

const DEFAULT_FORM = {
  title: {
    [locale.value]: ''
  },
  note: {
    [locale.value]: ''
  },
  category: '',
  locations: [''],
  time_start: '',
  time_end: '',
  icon: ''
};

const form = ref({
  ...DEFAULT_FORM
});

const { createProgramTimeline, updateProgramTimeline, getProgramTimelineById } =
  useApiProgramTimeline();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.programTimetableId) {
      // edit
      const { error, data } = await updateProgramTimeline(
        props.programTimetableId,
        form.value
      );

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', data);
          form.value = { ...DEFAULT_FORM };
          isLoading.value = false;
          toast.success('Program timetable updated!');
        }
      }
    } else {
      // add
      const { error, data } = await createProgramTimeline(form.value);

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', data);
          form.value = clone(DEFAULT_FORM);
          toast.success('Program timetable created!');
        }
      }
    }
    isLoading.value = false;
    model.value = false;
  } else {
    toast.error(t('errors.validation.invalid'));
    isLoading.value = false;
  }
}

const programTimetable = ref<ProgramTimeline>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getProgramTimelineById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      programTimetable.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.programTimetableId) {
      onGetDataById(props.programTimetableId);
    }
  }
);
</script>
