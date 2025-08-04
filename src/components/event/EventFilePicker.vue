<template>
  <UiDialog
    v-if="currentEvent"
    v-model="dialog"
    max-width="720"
    title="File select"
  >
    <template #activator="activatorProps">
      <slot
        name="activator"
        :selected="selectedModel"
        v-bind="activatorProps"
      ></slot>
    </template>
    <template #content>
      <v-tabs v-model="currentTab" color="primary">
        <v-tab v-for="tab in tabs" :key="`tab-${tab.id}`" :value="tab.id">
          {{ tab.title }}
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="currentTab">
        <v-tabs-window-item value="EVENT_FILES">
          <v-item-group
            v-model="selected"
            :class="{ 'mb-13': showSelectedToolbar }"
            :multiple="multiple"
            selected-class="bg-primary"
          >
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="eventFile in eventFiles"
                  :key="eventFile.file_id"
                  cols="auto"
                >
                  <v-item
                    v-slot="{ isSelected, toggle }"
                    :value="eventFile.url"
                  >
                    <AppAttachmentCard
                      :attachment="eventFile"
                      :variant="isSelected ? 'outlined' : 'flat'"
                      @click="toggle"
                    >
                      <template #image-default>
                        <div class="text-h3 flex-grow-1 text-center">
                          <v-icon v-if="isSelected" color="primary">
                            mdi-check-circle
                          </v-icon>
                        </div>
                      </template>
                    </AppAttachmentCard>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>

          <v-bottom-sheet
            v-if="showSelectedToolbar"
            contained
            :model-value="true"
            no-click-animation
            :opacity="0"
            persistent
            :retain-focus="false"
            :scrim="false"
          >
            <v-card color="primary" density="compact" rounded="lg">
              <v-list-item
                color="primary"
                density="compact"
                :title="`${Array.isArray(selected) ? selected.length : 1} selected`"
              >
                <template #prepend>
                  <v-btn
                    icon="$close"
                    variant="text"
                    @click="
                      () =>
                        isSelectedArray
                          ? (selected = [])
                          : (selected = undefined)
                    "
                  ></v-btn>
                </template>
                <template #append>
                  <VBtnPrimary @click="onApply"> Apply </VBtnPrimary>
                </template>
              </v-list-item>
            </v-card>
          </v-bottom-sheet>
        </v-tabs-window-item>

        <v-tabs-window-item value="UPLOAD">
          <v-container fluid>
            <v-row>
              <v-col>
                <AppFileUpload
                  :allowed-file-types="['image/*']"
                  bucket="events"
                  :folder-path="`${currentEvent.id}/files`"
                  heigth="200"
                  :on-save="onSave"
                  @upload:success="onApply"
                />
              </v-col>
            </v-row> </v-container
        ></v-tabs-window-item>
        <v-tabs-window-item value="URL">
          <v-container fluid>
            <v-row>
              <v-col>
                <v-text-field v-model="selected"></v-text-field>
              </v-col>
            </v-row>
            <div v-if="selected" class="d-flex">
              <v-spacer></v-spacer>
              <VBtnPrimary @click="onApply">Apply</VBtnPrimary>
            </div>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </template>
  </UiDialog>
</template>

<script setup lang="ts">
import UiDialog from '../../../lib/ui/components/UiDialog.vue';
import { ref } from 'vue';
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import useApiEventFile from '@/api/event-file.ts';
import type { EventFile } from '@/api/types/EventFile.ts';
import { toast } from 'vue-sonner';
import AppFileUpload, {
  type UploadedAttachment,
} from '@/components/app/AppFileUpload.vue';
import AppAttachmentCard from '@/components/app/AppAttachmentCard.vue';

defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: undefined,
  },
});

const selected = ref<string | string[]>();
const selectedModel = defineModel<string | string[]>('selected');

const dialog = defineModel({ type: Boolean, default: false });

const tabs = computed(() => [
  {
    id: 'EVENT_FILES',
    title: 'Event Files',
  },
  {
    id: 'UPLOAD',
    title: 'Upload',
  },
  {
    id: 'URL',
    title: 'URL',
  },
]);

const currentTab = ref(tabs.value[0].id);

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { getEventFilesByEventId } = useApiEventFile();

const eventFiles = ref<EventFile[]>([]);

const showSelectedToolbar = computed(
  () =>
    (Array.isArray(selected) && selected.value.length > 0) || !!selected.value,
);

const isLoadingEventFiles = ref(false);
async function onGetEventFiles() {
  if (!currentEvent.value?.id) return;
  isLoadingEventFiles.value = true;
  const { error, data } = await getEventFilesByEventId(currentEvent.value.id, [
    ['event_attachments.mime_type', 'like', 'image/%'],
  ]);

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (data) {
      eventFiles.value = data.filter(
        (i) => !!i.mime_type && i.mime_type.startsWith('image/'),
      );
    }
  }
  isLoadingEventFiles.value = false;
}

const isSelectedArray = computed(() => Array.isArray(selected.value));

watch(
  () => currentTab.value,
  (newValue) => {
    if (newValue === 'EVENT_FILES') {
      onGetEventFiles();
    }
  },
  { immediate: true },
);

watch(
  () => dialog.value,
  (newValue) => {
    if (newValue) {
      currentTab.value = tabs.value[0].id;
      if (!eventFiles.value.length) {
        onGetEventFiles();
      }
    } else {
      onClear();
    }
  },
);

function onClear() {
  currentTab.value = tabs.value[0].id;
  eventFiles.value = [];
  selected.value = undefined;
}

function onApply() {
  selectedModel.value = selected.value;
  dialog.value = false;
  onClear();
}

const onSave = async (attachments: UploadedAttachment[] = []) => {
  if (currentEvent.value) {
    if (isSelectedArray.value) {
      selected.value = attachments.map((i) => i.url);
    } else {
      selected.value = attachments.map((i) => i.url)[0];
    }
  }
};
</script>
