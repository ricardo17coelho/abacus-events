import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import pinia from '@/stores';
import { supabase } from '@/services/supabase';

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
          beforeEnter: (to) => {
            // only allow navigation to reset password
            // if we actually clicked a proper reset password link
            // which provides the type=recovery hash key
            if (!to.hash.includes('type=recovery')) {
              if (supabase().auth.user()) return '/';
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
        requiresAuth: false
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        }
      ]
    }
  ]
});

supabase().auth.onAuthStateChange((event) => {
  console.log(event);
  if (event == 'SIGNED_OUT') return router.push('/signin');
  if (event == 'SIGNED_IN') {
    const routeName = router.currentRoute.value.name;
    console.log('routeName', routeName);

    if (routeName == 'callback') {
      setTimeout(() => {
        return router.push({ name: 'home' });
      }, 0);
    }
  }
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const {
      data: { session }
    } = await supabase().auth.getSession();
    if (!session?.user) {
      return {
        path: '/signin'
      };
    }
  }
  if (to.meta.requiresNoAuth) {
    const {
      data: { session }
    } = await supabase().auth.getSession();
    if (session?.user) {
      return {
        path: '/'
      };
    }
  }
});

export default router;
