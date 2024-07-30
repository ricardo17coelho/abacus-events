import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/services/supabase';
import type { AuthChangeEvent } from '@supabase/supabase-js';
import { useAuthStore } from '@/stores/auth';
import useAuthUser from '@/composables/auth-user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      component: () => import('@/layouts/LayoutAuth.vue'),
      meta: {
        requiresNoAuth: true
      },
      children: [
        {
          path: '/signin',
          name: 'auth-sign-in',
          component: () => import('@/views/auth/SignIn.vue')
        },
        {
          path: '/signup',
          name: 'auth-sign-up',
          component: () => import('@/views/auth/SignUp.vue')
        },
        {
          path: '/forgotPassword',
          name: 'auth-forgot-password',
          component: () => import('@/views/auth/ForgotPassword.vue')
        }
      ]
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
                data: { user }
              } = await supabase().auth.getUser();
              if (user) return '/';
              return '/signin';
            }
          }
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
                'token_type'
              ].some((key) => !(key in hashDictionary))
            )
              return '/';
          }
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/NotFound.vue')
        }
      ]
    },

    {
      path: '/',
      component: () => import('@/layouts/LayoutDefault.vue'),
      meta: {
        requiresNoAuth: true
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/program',
          name: 'program',
          component: () => import('@/views/ProgramView.vue')
        },
        {
          path: '/parking',
          name: 'parking',
          component: () => import('@/views/ParkingView.vue')
        },
        {
          path: '/shuttle-schedule',
          name: 'shuttle-schedule',
          component: () => import('@/views/ShuttleSchedule.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/LayoutDefault.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue')
        }
      ]
    }
  ]
});

supabase().auth.onAuthStateChange((event: AuthChangeEvent) => {
  console.log(event);
  if (!event) return;
  if (event === 'SIGNED_OUT') {
    const authStore = useAuthStore();
    authStore.currentUser = undefined;
    router.push('/');
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
  const { setCurrentUser, currentUser } = useAuthStore();
  const { logout } = useAuthUser();
  const requiresNoAuth = to.meta.requiresNoAuth === true;

  const {
    data: { session }
  } = await supabase().auth.getSession();
  if (!requiresNoAuth) {
    if (session?.user) {
      setCurrentUser(session.user);
    } else {
      if (currentUser) {
        logout();
      }
      return {
        name: 'auth-sign-in',
        query: { redirect: to.path }
      };
    }
  } else {
    const isAuthRoute = to.name as string;
    if (session?.user) {
      setCurrentUser(session.user);
    }
    if (isAuthRoute.startsWith('auth-') && currentUser) {
      return {
        name: 'dashboard'
      };
    }
  }
});

export default router;
