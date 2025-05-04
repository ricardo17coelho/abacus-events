<template>
  <v-container
    v-if="currentEvent"
    class="d-flex justify-center flex-column ga-10 ma-0"
    fluid
  >
    <UiTable
      :actions="actions"
      :headers="headers"
      :items="currentEvent.files"
      :title="t('labels.features.FILES')"
    >
      <template #toolbar-actions>
        <AppFileUploadDialog
          v-model="dialogUpload"
          :allowed-file-types="['image/*', 'application/pdf']"
          bucket="events"
          :folder-path="`${currentEvent.id}/files`"
          :on-save="onSave"
          @upload:success="onUploadSuccess"
        >
          <template #activator="{ props: ActivatorProps }">
            <VBtnPrimary v-bind="ActivatorProps" append-icon="mdi-plus">
              {{ t('actions.upload') }}
            </VBtnPrimary>
          </template>
        </AppFileUploadDialog>
      </template>
      <template #[`item.mime_type`]="{ item }">
        <AttachmentMimeTypeIcon :attachment="item" />
      </template>
      <template #[`item.uploaded_at`]="{ item }">
        <v-chip color="primary" density="compact">
          {{ formatDateTimeByFormat(item.uploaded_at) }}
        </v-chip>
      </template>
    </UiTable>
  </v-container>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import { type UploadedAttachment } from '@/components/app/AppFileUpload.vue';
import {
  formatDateTimeByFormat,
  type MenuItem,
  UiTable,
  useMenuActions,
} from '@lib/ui';
import { toast } from 'vue-sonner';
import useApiEventFiles from '@/api/event-file.ts';
import useApi from '@/composables/api.ts';
import type { EventFile } from '@/api/types/EventFile.ts';
import useApiEventAttachment from '@/api/event-attachments.ts';
import AttachmentMimeTypeIcon from '@/components/attachments/AttachmentMimeTypeIcon.vue';
import { useI18n } from 'vue-i18n';
import AppFileUploadDialog from '@/components/app/AppFileUploadDialog.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { t } = useI18n();

const headers = ref([
  { title: '', key: 'mime_type' },
  { title: 'Display Name', key: 'display_name' },
  { title: 'Uploaded at', key: 'uploaded_at' },
]);

const { createEventAttachment, getEventAttachmentById, removeEventAttachment } =
  useApiEventAttachment();

const { createEventFile } = useApiEventFiles();
const { removeImg } = useApi();

const dialogUpload = ref(false);
function onUploadSuccess() {
  dialogUpload.value = false;
  toast.success('Upload successfully!');
}

async function onClickDelete(file: EventFile) {
  try {
    await removeImg('events', file.path);
    if (currentEvent.value?.brand) {
      // remove event file ( id is attachment id )
      const { error } = await removeEventAttachment(file.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      const idx = currentEvent.value.files.findIndex(
        (item) => item.id === file.id,
      );
      if (idx !== -1) {
        currentEvent.value.files.splice(idx, 1);

        toast.success('File removed!');
      }
    }
  } catch (e) {
    console.log(e);
  }
}

const onSave = async (attachments: UploadedAttachment[] = []) => {
  if (currentEvent.value) {
    // 1. add to `event_attachments`
    for (const attachment of attachments) {
      const { data: eventAttachment, error } = await createEventAttachment({
        ...attachment,
        event_id: currentEvent.value?.id,
      });
      if (error) {
        toast.error(error.message);
        return;
      }

      // 2. add to `event_brand_banners`
      if (eventAttachment) {
        const { error, data } = await createEventFile({
          event_attachment_id: eventAttachment.id,
          event_id: currentEvent.value?.id,
        });
        if (error) {
          toast.error(error.message);
          return;
        }

        if (data) {
          const { data: attachment } = await getEventAttachmentById(
            data.event_attachment_id,
          );
          currentEvent.value.files.push(attachment);
        }
      }
    }
    toast.success('File added!');
  }
};

const { menuGlobalActions } = useMenuActions();
const actions = computed<MenuItem[]>(() => [
  {
    ...menuGlobalActions.value.delete,
    show: () => true,
    action: (item: EventFile) => onClickDelete(item),
  },
]);
</script>
