<template>
  <v-container
    v-if="currentEvent"
    class="d-flex justify-center flex-column ga-10 ma-0"
    fluid
  >
    <v-row>
      <v-col>
        <VCardSettings height="100%" title="Colors">
          <v-card-item>
            <v-menu :close-on-content-click="false" z-index="2501">
              <template #activator="{ props: ActivatorProps }">
                <v-btn color="primary" v-bind="ActivatorProps">
                  Primary Color
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-color-picker
                    :model-value="currentEvent.brand?.color_primary"
                    @update:model-value="
                      onUpdateCompanyBrandDebounced({ color_primary: $event })
                    "
                  ></v-color-picker>
                </v-card-text>
              </v-card>
            </v-menu>
            <v-menu :close-on-content-click="false" z-index="2501">
              <template #activator="{ props: ActivatorProps }">
                <v-btn v-bind="ActivatorProps" class="ml-2" color="secondary">
                  Secondary Color
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-color-picker
                    :model-value="currentEvent.brand?.color_secondary"
                    @update:model-value="
                      onUpdateCompanyBrandDebounced({
                        color_secondary: $event,
                      })
                    "
                  ></v-color-picker>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-card-item>
        </VCardSettings>
      </v-col>
      <v-col>
        <VCardSettings height="100%" title="Logo">
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
          </v-card-item>
        </VCardSettings>
      </v-col>
    </v-row>

    <VCardSettings title="Banner">
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
        <div class="d-flex align-start ga-3">
          <v-card
            v-for="banner in currentEvent.brand.banners"
            :key="banner.url"
            width="200"
          >
            <v-card-item>
              <v-img :aspect-ratio="16 / 9" :src="banner.url"></v-img>
            </v-card-item>
            <v-card-actions>
              <v-btn color="error" @click="onClickBannerDelete(banner.path)">
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card-text>
    </VCardSettings>
  </v-container>
</template>
<script lang="ts" setup>
import { requireInjection } from '@/utils/injection.ts';
import { CURRENT_EVENT_KEY } from '@/types/injectionKeys.ts';
import type { EventBrand, EventBrandBanner } from '@/api/types/Event.ts';
import useApi from '@/composables/api.ts';
import { toast } from 'vue-sonner';
import { UiDialog, UiFileInput } from '@lib/ui';
import AppFileUpload from '@/components/app/AppFileUpload.vue';

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
        color_primary: data.color_primary,
        color_secondary: data.color_secondary,
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
    }
  }
};

const onBannersSave = async (banners: EventBrandBanner[] = []) => {
  if (currentEvent.value) {
    const eventBanners = [...currentEvent.value.brand.banners, ...banners];
    await addOrUpdate('event_brand', {
      banners: eventBanners,
      event_id: currentEvent.value?.id,
    });

    currentEvent.value.brand = {
      ...currentEvent.value.brand,
      banners: eventBanners,
    };
  }
};

const dialogUpload = ref(false);
function onUploadSuccess() {
  dialogUpload.value = false;
  toast.success('Upload successfully!');
}

async function onClickBannerDelete(path: string) {
  try {
    await removeImg('events', path);
    if (currentEvent.value?.brand) {
      const idx = currentEvent.value.brand.banners.findIndex(
        (item) => item.path === path,
      );
      if (idx !== -1) {
        const banners = currentEvent.value.brand.banners;
        banners.splice(idx, 1);

        await addOrUpdate('event_brand', {
          banners,
          event_id: currentEvent.value?.id,
        });

        currentEvent.value.brand = {
          ...currentEvent.value.brand,
          banners,
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
}
</script>
