import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/services/supabase.ts';
import type { AuthChangeEvent } from '@supabase/supabase-js';
import useAuthUser from '@/composables/auth-user.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

    {
      path: '/',
      component: () => import('@/layouts/event/LayoutEvent.vue'),
      meta: {
        requiresNoAuth: true,
      },
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/NotFound.vue'),
        },
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/:eventId',
          component: () => import('@/plugins/router/guards/GuardEvent.vue'),
          children: [
            {
              path: '',
              name: 'event',
              component: () => import('@/views/event/EventView.vue'),
            },
            {
              path: 'program',
              name: 'event-program',
              component: () => import('@/views/event/EventTimelineView.vue'),
            },
            {
              path: 'parking',
              name: 'event-parking',
              component: () => import('@/views/event/EventParkingView.vue'),
            },
            {
              path: 'shuttle-schedule',
              name: 'shuttle-schedule',
              component: () => import('@/views/event/EventShuttleSchedule.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/default/LayoutDefault.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/NotFound.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'manage',
          children: [
            {
              path: 'parking-lots',
              name: 'manage-parking-lots',
              component: () => import('@/views/manage/ManageParkingLots.vue'),
            },
            {
              path: 'events',
              name: 'manage-events',
              component: () => import('@/views/manage/ManageEvents.vue'),
            },
            {
              path: 'users',
              name: 'manage-users',
              component: () => import('@/views/manage/ManageUsers.vue'),
            },
          ],
        },
      ],
    },
  ],
});

supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
  console.log(event);
  if (!event) return;
  if (event === 'SIGNED_OUT') {
    const { user } = useAuthUser();
    user.value = undefined;
    void router.push('/');
    return;
  } else if (event === 'SIGNED_IN') {
    const routeName = router.currentRoute.value.name;
    console.log('routeName', routeName);

    if (routeName === 'callback') {
      setTimeout(() => {
        return router.push({ name: 'home' });
      }, 0);
    }
  }
});

router.beforeEach(async (to) => {
  const { logout, user } = useAuthUser();
  const requiresNoAuth = to.meta.requiresNoAuth === true;

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!requiresNoAuth) {
    if (session?.user) {
      user.value = session.user;
    } else {
      if (user.value) {
        void logout();
      }
      return {
        name: 'auth-sign-in',
        query: { redirect: to.path },
      };
    }
  } else {
    const isAuthRoute = to.name as string;
    if (session?.user) {
      user.value = session.user;
    }
    if (isAuthRoute.startsWith('auth-') && user.value) {
      return {
        name: 'dashboard',
      };
    }
  }
});

export default router;
