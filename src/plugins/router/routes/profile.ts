import LayoutDefault from '@/layouts/default/LayoutDefault.vue';

export default [
  {
    path: '/profile',
    component: LayoutDefault,
    children: [
      {
        path: '/',
        name: 'profile',
        component: () => import('@/views/profile/Profile.vue'),
      },
    ],
  },
];
