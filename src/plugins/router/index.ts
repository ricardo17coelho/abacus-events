import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/services/supabase.ts';
import type { AuthChangeEvent } from '@supabase/supabase-js';
import useAuthUser from '@/composables/auth-user.ts';

// routes
import routesManage from './routes/manage';
import routesAuth from './routes/auth';
import routesEvent from './routes/event';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routesAuth, ...routesEvent, ...routesManage],
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
