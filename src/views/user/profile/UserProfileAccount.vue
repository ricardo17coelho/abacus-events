<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-form ref="formPasswordRef" class="fill-height" @submit.prevent>
        <VCardSettings
          class="d-flex flex-column"
          height="100%"
          subtitle="To change your password please confirm here"
          title="Change Password"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <FieldPassword
                  id="password-current"
                  v-model="formPassword.currentPassword"
                  :disabled="loadingFormPassword"
                  :label="t('views.profile.password_current.label')"
                  name="password-current"
                  :placeholder="t('views.profile.password_current.placeholder')"
                />
              </v-col>
              <v-col cols="12">
                <FieldPassword
                  id="password-new"
                  v-model="formPassword.newPassword"
                  :disabled="loadingFormPassword"
                  :label="t('views.profile.password_new.label')"
                  name="password-new"
                  :placeholder="t('views.profile.password_new.placeholder')"
                />
              </v-col>
              <v-col cols="12">
                <FieldPassword
                  id="password-confirm"
                  v-model="formPassword.newPasswordConfirm"
                  :disabled="loadingFormPassword"
                  :label="t('views.profile.password_confirm.label')"
                  name="password-confirm"
                  :placeholder="t('views.profile.password_confirm.placeholder')"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <VBtnPrimary
              :disabled="loadingFormPassword"
              @click="changePassword"
            >
              {{ t('actions.save') }}
            </VBtnPrimary>
          </v-card-actions>
        </VCardSettings>
      </v-form>
    </v-col>
    <v-col cols="12" md="6">
      <v-form
        ref="formPersonalDetailsRef"
        class="fill-height"
        @submit.prevent="changeFirstnameAndLastname"
      >
        <VCardSettings
          class="d-flex flex-column"
          height="100%"
          title="Personal Details"
        >
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  id="first_name"
                  v-model="formPersonalDetails.first_name"
                  :disabled="loadingFormPersonalDetails"
                  :label="t('views.profile.first_name.label')"
                  name="first_name"
                  :placeholder="t('views.profile.first_name.placeholder')"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  id="last_name"
                  v-model="formPersonalDetails.last_name"
                  class="inline-block"
                  :disabled="loadingFormPersonalDetails"
                  :label="t('views.profile.first_name.label')"
                  name="last_name"
                  :placeholder="t('views.profile.first_name.placeholder')"
                  required
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <VBtnPrimary :disabled="loadingFormPersonalDetails" type="submit">
              {{ t('actions.save') }}
            </VBtnPrimary>
          </v-card-actions>
        </VCardSettings>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
// composables
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';
import useAuthUser from '@/composables/auth-user';
import FieldPassword from '@/components/fields/FieldPassword.vue';

const { userMetadata, updateUser } = useAuthUser();

const { t } = useI18n();

const DEFAULT_FORM_PASSWORD = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const formPassword = ref({
  ...DEFAULT_FORM_PASSWORD,
});

const loadingFormPassword = ref(false);
const formPasswordRef = ref();

/* Change Password */
async function changePassword() {
  loadingFormPassword.value = true;
  const { valid } = await formPasswordRef.value.validate();
  if (valid) {
    const { error } = await updateUser({
      password: formPassword.value.newPassword,
    });
    if (error) {
      toast.error(error?.message);
    } else {
      toast.success(t('views.profile.toast.password.success'));
      formPasswordRef.value.reset();
    }
  } else {
    toast.error(t('errors.validation.invalid'));
  }
  loadingFormPassword.value = false;
}

const DEFAULT_FORM_PERSONAL_DETAILS = {
  first_name: '',
  last_name: '',
};

const formPersonalDetails = ref({
  ...DEFAULT_FORM_PERSONAL_DETAILS,
  first_name: userMetadata.value?.first_name,
  last_name: userMetadata.value?.last_name,
});

const loadingFormPersonalDetails = ref(false);
const formPersonalDetailsRef = ref();

async function changeFirstnameAndLastname() {
  loadingFormPassword.value = true;
  const { valid } = await formPersonalDetailsRef.value.validate();
  if (valid) {
    const { error } = await updateUser({
      data: { ...formPersonalDetails.value },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t('views.profile.toast.user_infos.success'));
    }
  } else {
    toast.error(t('errors.validation.invalid'));
  }
  loadingFormPassword.value = false;
}
</script>
