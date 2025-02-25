import { clone } from '@/utils/clone';
import type { User } from '@supabase/supabase-js';

import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAuthStore = defineStore('authStore', () => {
  const currentUser = ref<User>();

  const currentUserMetadata = computed(() => currentUser.value?.user_metadata);

  const currentUserDisplayName = computed(() => {
    if (!currentUserMetadata.value?.firstname) return undefined;
    if (!currentUserMetadata.value?.lastname) {
      return currentUserMetadata.value?.firstname;
    }
    return `${currentUserMetadata.value?.firstname} ${currentUserMetadata.value?.lastname}`;
  });

  const currentUserRoles = computed(
    () => currentUser.value?.app_metadata?.userroles || []
  );

  const isCurrentUserAdmin = computed(() =>
    currentUserRoles.value.includes('ADMIN')
  );

  const isCurrentUserHelper = computed(() =>
    currentUserRoles.value.includes('HELPER')
  );

  const isCurrentUserAdminOrHelper = computed(
    () => isCurrentUserAdmin.value || isCurrentUserHelper.value
  );

  function setCurrentUser(supabaseUser: User) {
    if (!supabaseUser) return;
    if (currentUser.value) {
      Object.assign(currentUser.value, supabaseUser);
    } else {
      currentUser.value = clone(supabaseUser);
    }
  }

  return {
    // state
    currentUser,
    currentUserMetadata,
    currentUserDisplayName,
    currentUserRoles,
    isCurrentUserAdmin,
    isCurrentUserHelper,
    isCurrentUserAdminOrHelper,
    setCurrentUser
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
