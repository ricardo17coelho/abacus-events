<template>
  <ManageEventContainer v-if="currentEvent">
    <v-row>
      <v-col cols="12" md="6">
        <VCardSettings
          height="100%"
          subtitle="The primary/secondary color of the event"
          title="Colors"
        >
          <v-card-item>
            <div class="d-flex ga-4">
              <FieldColorPickerBtn
                color="primary"
                label="Primary Color"
                :model-value="currentEvent.brand?.color_primary"
                @update:model-value="
                  onUpdateCompanyBrandDebounced({ color_primary: $event })
                "
              />

              <FieldColorPickerBtn
                color="secondary"
                label="Secondary Color"
                :model-value="currentEvent.brand?.color_secondary"
                @update:model-value="
                  onUpdateCompanyBrandDebounced({
                    color_secondary: $event,
                  })
                "
              />
            </div>
          </v-card-item>
        </VCardSettings>
      </v-col>
      <v-col cols="12" md="6">
        <VCardSettings
          height="100%"
          subtitle="The logo of the event"
          title="Logo"
        >
          <v-card-item>
            <v-img
              class="cursor-pointer border border-dashed"
              height="100"
              :src="currentEvent.brand?.logo"
              width="100"
              @click="onLogoUpload"
            >
              <template #placeholder>
                <div
                  v-if="currentEvent.brand?.logo"
                  class="d-flex align-center justify-center fill-height"
                >
                  <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                  ></v-progress-circular>
                </div>

                <div
                  v-else
                  class="d-flex align-center justify-center fill-height border border-dashed"
                >
                  <v-icon>mdi-image</v-icon>
                </div>
              </template>
              <UiFileInput
                ref="coreFileInputLogoRef"
                @change="onLogoChange($event.file)"
              />
            </v-img>
            <v-btn
              v-if="currentEvent.brand?.logo"
              class="mt-2"
              color="error"
              variant="text"
              @click="onLogoDelete(currentEvent.brand?.logo)"
            >
              Delete
            </v-btn>
          </v-card-item>
        </VCardSettings>
      </v-col>
    </v-row>

    <VCardSettings subtitle="The banners of the events" title="Banner">
      <template #append>
        <UiDialog v-model="dialogUpload" max-width="600">
          <template #activator="{ props: ActivatorProps }">
            <v-btn v-bind="ActivatorProps" append-icon="mdi-plus">
              Upload
            </v-btn>
          </template>
          <template #content>
            <AppFileUpload
              bucket="events"
              :folder-path="`${currentEvent.id}/brand/banners`"
              :on-save="onBannersSave"
              @upload:success="onUploadSuccess"
            />
          </template>
        </UiDialog>
      </template>
      <v-card-text>
        <div v-if="currentEvent.brand?.banners" class="d-flex align-start ga-3">
          <v-card
            v-for="banner in currentEvent.brand.banners"
            :key="banner.url"
            width="200"
          >
            <v-card-item>
              <v-img :aspect-ratio="16 / 9" :src="banner.url"></v-img>
            </v-card-item>
            <v-card-actions>
              <v-btn color="error" @click="onClickBannerDelete(banner)">
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card-text>
    </VCardSettings>

    <VCardSettings
      height="100%"
      subtitle="The layout of the event used on the main page"
      title="Layout"
    >
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <EventLayoutField
              :model-value="currentEvent.brand?.layout"
              @update:model-value="onUpdateEventLayout"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </VCardSettings>
  </ManageEventContainer>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type { EventBrand, EventBrandBanner } from '@/api/types/EventBrand.ts';
import useApi from '@/composables/api.ts';
import { toast } from 'vue-sonner';
import { UiDialog, UiFileInput } from '@lib/ui';
import AppFileUpload, {
  type UploadedAttachment,
} from '@/components/app/AppFileUpload.vue';
import EventLayoutField from '@/components/event/EventLayoutField.vue';
import type { EventLayout } from '@/api/types/EventLayout.ts';
import useApiEventAttachment from '@/api/event-attachments.ts';
import useApiEventBrand from '@/api/event-brand.ts';
import FieldColorPickerBtn from '@/components/fields/FieldColorPickerBtn.vue';
import ManageEventContainer from '@/components/manage/ManageEventContainer.vue';

const currentEvent = requireInjection(CURRENT_EVENT_KEY);

const { addOrUpdate, removeImg } = useApi();

async function onUpdateCompanyBrand(data: Partial<EventBrand>) {
  const { error } = await addOrUpdate('event_brand', {
    ...data,
    event_id: currentEvent.value?.id,
  });

  if (error) {
    if (error.message) {
      toast.error(error.message);
    }
  } else {
    if (currentEvent.value?.brand) {
      currentEvent.value.brand = {
        ...currentEvent.value.brand,
        color_primary: Object.keys(data).includes('color_primary')
          ? data.color_primary
          : currentEvent.value.brand.color_primary,
        color_secondary: Object.keys(data).includes('color_secondary')
          ? data.color_secondary
          : currentEvent.value.brand.color_secondary,
      };
    }
    toast.success('Brand updated!');
  }
}

const onUpdateCompanyBrandDebounced = useDebounceFn(
  (data: Partial<EventBrand>) => {
    onUpdateCompanyBrand(data);
  },
  1000,
);

const { uploadImg } = useApi();

const coreFileInputLogoRef = ref();

const onLogoUpload = () => {
  if (coreFileInputLogoRef.value) {
    coreFileInputLogoRef.value.click();
  }
};

const onLogoChange = async (file: File) => {
  if (file && currentEvent.value) {
    // remove current logo if exists before upload
    if (currentEvent.value?.brand?.logo) {
      await onLogoDelete(currentEvent.value.brand?.logo);
    }

    const { data } = await uploadImg(
      file,
      'events',
      `${currentEvent.value?.id}`,
    );

    if (data.publicUrl) {
      await addOrUpdate('event_brand', {
        logo: data.publicUrl,
        event_id: currentEvent.value?.id,
      });

      currentEvent.value.brand = {
        ...currentEvent.value.brand,
        logo: data.publicUrl,
      };
      toast.success('Brand updated!');
    }
  }
};

const { createEventAttachment, removeEventAttachment } =
  useApiEventAttachment();
const { createEventBrandBanner, getEventBrandByEventId } = useApiEventBrand();

const onBannersSave = async (attachments: UploadedAttachment[] = []) => {
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
        const { error } = await createEventBrandBanner({
          event_attachment_id: eventAttachment.id,
          // event_brand_id === event_id
          event_brand_id: currentEvent.value?.id,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
      }
    }

    // refresh branding
    const { data } = await getEventBrandByEventId(currentEvent.value.id);

    if (data) {
      currentEvent.value.brand = data;
    }
    toast.success('Brand updated!');
  }
};

const dialogUpload = ref(false);
function onUploadSuccess() {
  dialogUpload.value = false;
  toast.success('Upload successfully!');
}

async function onClickBannerDelete(banner: EventBrandBanner) {
  try {
    await removeImg('events', banner.path);
    if (currentEvent.value?.brand) {
      // remove event brand banner ( id is attachment id )
      const { error } = await removeEventAttachment(banner.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      const idx = currentEvent.value.brand.banners.findIndex(
        (item) => item.id === banner.id,
      );
      if (idx !== -1) {
        const banners = currentEvent.value.brand.banners;
        banners.splice(idx, 1);

        currentEvent.value.brand = {
          ...currentEvent.value.brand,
          banners,
        };
        toast.success('Brand updated!');
      }
    }
  } catch (e) {
    console.log(e);
  }
}

async function onLogoDelete(logo: string) {
  if (!logo) return;

  const logoPath = logo.split('/public/events/')?.[1];

  if (!logoPath) return;
  try {
    await removeImg('events', logoPath);
    if (currentEvent.value?.brand) {
      currentEvent.value.brand = {
        ...currentEvent.value.brand,
        logo: '',
      };
    }
  } catch (e) {
    console.log(e);
    toast.error('Error on delete logo');
  }
}

async function onUpdateEventLayout(layout: EventLayout) {
  if (currentEvent.value) {
    await addOrUpdate('event_brand', {
      event_id: currentEvent.value?.id,
      layout,
    });

    currentEvent.value.brand = {
      ...currentEvent.value.brand,
      layout,
    };
    toast.success('Brand updated!');
  }
}
</script>
