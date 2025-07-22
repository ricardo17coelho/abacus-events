import { ref } from 'vue';
import type { Provider, UserAttributes } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';
import { getInitials } from '@/utils/initials.ts';
import { getUserFullName } from '@/utils/profile.ts';
// user is set outside the useAuthUser function
// so that it will act as global state and always refer to a single user

const user = ref();

export default function useAuthUser() {
  /**
   * Login with email and password
   */
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
    redirectTo: string,
  ) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });

    return { data, error };
  };

  /**
   * Logout
   */
  const logout = async () => {
    return supabase.auth.signOut().then(() => {
      user.value = null;
    });
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = computed(() => !!user.value);

  const userMetadata = computed(() => user.value?.user_metadata);

  const userDisplayName = computed(() => {
    return getUserFullName(userMetadata.value);
  });

  const userInitials = computed(() => getInitials(userDisplayName.value));

  const userRoles = computed(() => user.value?.app_metadata?.userroles || []);

  const isUserAdmin = computed(() => userRoles.value.includes('ADMIN'));

  const isUserHelper = computed(() => userRoles.value.includes('HELPER'));

  const isUserAdminOrHelper = computed(
    () => isUserAdmin.value || isUserHelper.value,
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
        ...options,
      },
    });
    if (data && data.user) {
      user.value = data.user;
    }
    return { data, error };
  };

  /**
   * Resend verification email
   */
  const resendVerificationEmail = async (email: string) => {
    return supabase.auth.resend({
      type: 'signup',
      email,
    });
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
    } = {},
  ) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email,
      options,
    );
    return { data, error };
  };

  const resetPassword = async (newPassword: string) => {
    return supabase.auth.updateUser({
      password: newPassword,
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
    return supabase.auth.refreshSession();
  };

  return {
    user,
    userMetadata,
    userDisplayName,
    userInitials,
    userRoles,
    isUserAdmin,
    isUserHelper,
    isUserAdminOrHelper,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    signUp,
    resendVerificationEmail,
    updateUser,
    sendPasswordRestEmail,
    resetPassword,
    fetchUser,
    refreshSession,
  };
}
