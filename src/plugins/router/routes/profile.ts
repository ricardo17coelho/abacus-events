export default [
  {
    path: '/profile',
    component: () => import('@/views/user/profile/UserProfile.vue'),
    children: [
      {
        path: '',
        name: 'profile-account',
        component: () => import('@/views/user/profile/UserProfileAccount.vue'),
      },
      {
        path: 'settings',
        name: 'profile-settings',
        component: () => import('@/views/user/profile/UserProfileSettings.vue'),
      },
    ],
  },
];
