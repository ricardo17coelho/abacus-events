import useApi from '@/composables/api';
import type { Profile } from './types/Profile';
import { supabase } from '@/services/supabase.ts';

export default function useApiProfiles() {
  const { findById, update, remove, count } = useApi();

  const baseSelect = `
    *
  `;

  function getProfiles(range = [0, 100]) {
    const limit = range[1] - range[0];
    const offset = range[0];

    return supabase.rpc('get_profiles_with_roles', {
      page_limit: limit,
      page_offset: offset,
    });
  }

  function getProfileById(eventId: string) {
    return findById<Profile>('profiles', eventId, baseSelect);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateProfile(id: string, form: Record<string, any>) {
    return update<Profile>('profiles', {
      id,
      ...form,
    });
  }

  function removeProfile(id: string) {
    return remove('profiles', id);
  }

  function getProfilesCount() {
    return count('profiles');
  }

  return {
    getProfiles,
    getProfileById,
    updateProfile,
    removeProfile,
    getProfilesCount,
  };
}
