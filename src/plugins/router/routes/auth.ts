import { supabase } from '@/services/supabase.ts';

export default [
  {
    path: '/signin',
    component: () => import('@/layouts/LayoutAuth.vue'),
    meta: {
      requiresNoAuth: true,
    },
    children: [
      {
        path: '/signin',
        name: 'auth-sign-in',
        component: () => import('@/views/auth/SignIn.vue'),
      },
      {
        path: '/signup',
        name: 'auth-sign-up',
        component: () => import('@/views/auth/SignUp.vue'),
        beforeEnter: () => {
          if (import.meta.env.VITE_AUTH_SIGN_UP_ENABLED !== 'true')
            return '/404';
        },
      },
      {
        path: '/forgotPassword',
        name: 'auth-forgot-password',
        component: () => import('@/views/auth/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/resetpassword',
    component: () => import('@/layouts/LayoutAuth.vue'),
    children: [
      {
        path: '/resetpassword',
        name: 'auth-reset-password',
        component: () => import('@/views/auth/ResetPassword.vue'),
        beforeEnter: async (to) => {
          // only allow navigation to reset password
          // if we actually clicked a proper reset password link
          // which provides the type=recovery hash key
          if (!to.hash.includes('type=recovery')) {
            const {
              data: { user },
            } = await supabase.auth.getUser();
            if (user) return '/';
            return '/signin';
          }
        },
      },
      {
        path: '/callback',
        name: 'callback',
        component: () => import('@/views/auth/AuthCallback.vue'),
        beforeEnter: (to) => {
          /* Parse the route hash into a dictionary */
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          const hashDictionary = {} as any;
          // first remove the actual '#' character
          const hash = to.hash.replace('#', '');
          // split hash into key-value pairs
          hash.split('&').forEach((item) => {
            // split 'key=value' into [key, value]
            const [key, value] = item.split('=');
            // add to results
            hashDictionary[key] = value;
          });

          if (
            [
              'access_token',
              'expires_in',
              'provider_token',
              'refresh_token',
              'token_type',
            ].some((key) => !(key in hashDictionary))
          )
            return '/';
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
      },
    ],
  },
];
