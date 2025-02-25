import { ref } from 'vue';
import type { Provider, UserAttributes } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';
// user is set outside the useAuthUser function
// so that it will act as global state and always refer to a single user

const user = ref();

export default function useAuthUser() {
  /**
   * Login with email and password
   */
  const login = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (data && data.user) {
      user.value = data.user;
    }
    return { data, error };
  };

  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async (
    provider: Provider,
    redirectTo: string
  ) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo }
    });

    return { data, error };
  };

  /**
   * Logout
   */
  const logout = async () => {
    return await supabase.auth.signOut().then(() => {
      user.value = null;
    });
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = computed(() => !!user.value);

  const currentUserMetadata = computed(() => user.value?.user_metadata);

  const currentUserDisplayName = computed(() => {
    if (!currentUserMetadata.value?.firstname) return undefined;
    if (!currentUserMetadata.value?.lastname) {
      return currentUserMetadata.value?.firstname;
    }
    return `${currentUserMetadata.value?.firstname} ${currentUserMetadata.value?.lastname}`;
  });

  const currentUserRoles = computed(
    () => user.value?.app_metadata?.userroles || []
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

  /**
   * SignUp
   */
  const signUp = async ({
    email,
    password,
    ...options
  }: {
    email: string;
    password: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // arbitrary meta data is passed as the second argument under a data key
      // to the Supabase signUp method
      options: {
        // the to redirect to after the user confirms their email
        // window.location wouldn't be available if we were rendering server side
        // but since we're all on the client it will work fine
        emailRedirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation"`,
        ...options
      }
    });
    if (data && data.user) {
      user.value = data.user;
    }
    return { data, error };
  };

  /**
   * Update user email, password, or meta data
   */
  const updateUser = async (payload: UserAttributes) => {
    const { data, error } = await supabase.auth.updateUser(payload);

    if (data && data.user) {
      user.value = data.user;
    }
    return { data, error };
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (
    email: string,
    options: {
      redirectTo?: string;
      captchaToken?: string;
    } = {}
  ) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email,
      options
    );
    return { data, error };
  };

  const resetPassword = async (newPassword: string) => {
    return await supabase.auth.updateUser({
      password: newPassword
    });
  };

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
      user.value = data.user;
    }
    return { data, error };
  };

  const refreshSession = async () => {
    return await supabase.auth.refreshSession();
  };

  return {
    user,
    currentUserMetadata,
    currentUserDisplayName,
    currentUserRoles,
    isCurrentUserAdmin,
    isCurrentUserHelper,
    isCurrentUserAdminOrHelper,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    signUp,
    updateUser,
    sendPasswordRestEmail,
    resetPassword,
    fetchUser,
    refreshSession
  };
}
