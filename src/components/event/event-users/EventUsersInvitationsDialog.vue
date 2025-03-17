<template>
  <UiDialog v-model="model" title="EventInvitation" width="500">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>
    <template #content>
      <EventUsersInvitationsForm ref="formRef" v-model="form" />
    </template>
    <template #actions>
      <VBtnPrimary :loading="isLoading" @click="onSave">
        {{ t('actions.send') }}
      </VBtnPrimary>
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
// components
import { UiDialog } from '@lib/ui';
import EventUsersInvitationsForm from './EventUsersInvitationsForm.vue';
// apis
import useApiEventInvitations from '@/api/event-invitations.ts';
// composables
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';

const props = defineProps({
  invitationId: {
    type: String,
    default: undefined,
  },
});

const model = defineModel({ type: Boolean, default: false });

const { t } = useI18n();

const DEFAULT_FORM = {
  email: '',
  roleId: undefined,
  message: '',
};

const form = ref({
  ...DEFAULT_FORM,
});

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { createInvitation, sendInvitationEmail } = useApiEventInvitations();

const isLoading = ref(false);
const formRef = ref();

async function onSave() {
  if (!currentEvent.value?.id) return;
  const { valid } = await formRef.value.formRef.validate();
  if (valid) {
    isLoading.value = true;
    if (props.invitationId) {
      // edit
    } else {
      // add
      const { error, data } = await createInvitation({
        eventId: currentEvent.value.id,
        roleId: form.value.roleId || '',
        email: form.value.email || '',
        message: form.value.message,
      });

      if (error) {
        if (error.message) {
          toast.error(error.message);
        }
        console.error('Error creating invitation:', error);
        isLoading.value = false;
        return;
      }

      if (!data) return;

      const invitationId = data.id;

      const email = form.value.email;
      if (!email) return;
      const message = form.value.message;

      // Call the Supabase function to send the invitation email
      const { error: functionError } = await sendInvitationEmail(
        invitationId,
        [email],
        message,
      );

      if (functionError) {
        console.error('Error sending invitation email:', functionError);
        toast.error(t('errors.error_occurred'));
      } else {
        toast.success(`EventInvitation created and email sent to: ${email}!`);
        model.value = false;
        form.value = {
          ...DEFAULT_FORM,
        };
        isLoading.value = false;
      }
    }
  } else {
    toast.error(t('errors.validation.invalid'));
  }
}
</script>
