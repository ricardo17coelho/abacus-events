<template>
  <UiDialog
    v-model="model"
    max-width="600"
    :title="t('labels.features.SHUTTLE_PLAN')"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <template #content>
      <EventShuttlePlanForm ref="formRef" v-model="form" />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ t('actions.save') }}
      </VBtnPrimary>
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
// components
import { UiDialog } from '@lib/ui';
import EventShuttlePlanForm from './EventShuttlePlanForm.vue';
// apis
import useApiEventShuttlePlan from '@/api/event-shuttle-plan.ts';
// types & constants
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type {
  EventShuttlePlan,
  ShuttlePlanDirection,
} from '@/api/types/EventShuttlePlan.ts';
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import { merge2ObjectsIfKeysExists } from '@/utils/merge.ts';

const props = defineProps({
  eventShuttlePlanId: {
    type: String,
    default: undefined,
  },
  direction: {
    type: String as PropType<ShuttlePlanDirection>,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const emit = defineEmits(['success']);

const { t } = useI18n();

const DEFAULT_FORM = {
  direction: 'OUTWARD',
  location: undefined,
  location_link: undefined,
  order: undefined,
};

const form = ref({
  ...DEFAULT_FORM,
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const {
  createEventShuttlePlan,
  updateEventShuttlePlan,
  getEventShuttlePlanById,
} = useApiEventShuttlePlan();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  if (!currentEvent.value) return;
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.eventShuttlePlanId) {
      const { error, data } = await updateEventShuttlePlan(
        props.eventShuttlePlanId,
        {
          ...form.value,
          event_id: currentEvent.value?.id,
        },
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
          toast.success('Updated!');
          model.value = false;
        }
      }
    } else {
      // add
      const { error, data } = await createEventShuttlePlan({
        ...form.value,
        event_id: currentEvent.value.id,
      });

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
      } else {
        if (data) {
          emit('success', data);
          form.value = { ...DEFAULT_FORM };
          toast.success('Item added!');
        }
      }
    }

    isLoading.value = false;
  } else {
    toast.error(t('errors.validation.invalid'));
    isLoading.value = false;
  }
}

const shuttlePlan = ref<EventShuttlePlan>();
const isLoadingInitial = ref(false);

async function onGetDataById(id: string) {
  isLoadingInitial.value = true;
  const { error, data } = await getEventShuttlePlanById(id);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      shuttlePlan.value = data;
      form.value = merge2ObjectsIfKeysExists({ ...DEFAULT_FORM }, data);
    }
  }
  isLoadingInitial.value = false;
}

watch(
  () => model.value,
  async (newValue) => {
    if (newValue && props.eventShuttlePlanId) {
      onGetDataById(props.eventShuttlePlanId);
    }
  },
);
</script>
