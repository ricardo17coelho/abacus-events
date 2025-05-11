import useApi from '@/composables/api';
import type { ProfileSettings } from './types/Profile';

export default function useApiProfileSettings() {
  const { find, findById, update, remove, count, supabase } = useApi();

  const baseSelect = `
    *
  `;

  function getProfileSettings(range = [0, 10]) {
    return find<ProfileSettings>('profile_settings', [], baseSelect, range);
  }

  function getProfileSettingById(eventId: string) {
    return findById<ProfileSettings>('profile_settings', eventId, baseSelect);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateProfileSetting(id: string, form: Record<string, any>) {
    return update<ProfileSettings>('profile_settings', {
      id,
      ...form,
    });
  }

  function removeProfileSetting(id: string) {
    return remove('profile_settings', id);
  }

  function getProfileSettingsCount() {
    return count('profiles');
  }

  async function saveAiApiKey(key: string) {
    console.warn('saveAiApiKey', key);
    return supabase.functions.invoke('ai-save_api_key', {
      body: { openai_api_key: key },
    });
  }

  return {
    getProfileSettings,
    getProfileSettingById,
    updateProfileSetting,
    removeProfileSetting,
    getProfileSettingsCount,
    saveAiApiKey,
  };
}
