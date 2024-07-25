import { ref } from 'vue';
import type { Provider, UserAttributes } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';
// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user

// o usuário é definido fora da função useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário
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
    const { data, error } = await supabase().auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async (
    provider: Provider,
    redirectTo: string
  ) => {
    const { data, error } = await supabase().auth.signInWithOAuth({
      provider,
      options: { redirectTo }
    });
    return { data, error };
  };

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase().auth.signOut();
    return { error };
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!user.value;
  };

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
    const { data, error } = await supabase().auth.signUp({
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
    return { data, error };
  };

  /**
   * Update user email, password, or meta data
   */
  const updateUser = async (payload: UserAttributes) => {
    return await supabase().auth.updateUser(payload);
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
    const { data, error } = await supabase().auth.resetPasswordForEmail(
      email,
      options
    );
    return { data, error };
  };

  const resetPassword = async (newPassword: string) => {
    return await supabase().auth.updateUser({
      password: newPassword
    });
  };

  const fetchUser = async () => {
    const { data, error } = await supabase().auth.getUser();
    if (data?.user) {
      user.value = data.user;
    }
    return { data, error };
  };

  const refreshSession = async () => {
    return await supabase().auth.refreshSession();
  };

  return {
    user,
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
