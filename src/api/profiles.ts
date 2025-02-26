import useApi from '@/composables/api';
import type { Profile } from './types/Profile';

export default function useApiProfiles() {
  const { find, findById, update, remove, count } = useApi();

  const baseSelect = `
    *
  `;

  function getProfiles(range = [0, 10]) {
    return find<Profile>('profiles', [], baseSelect, range);
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
