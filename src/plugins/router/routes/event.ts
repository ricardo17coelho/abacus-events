import LayoutDefault from '@/layouts/default/LayoutDefault.vue';

export default [
  {
    path: '/',
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
        component: LayoutDefault,
        children: [
          {
            path: '',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
          },
        ],
      },
      {
        path: '',
        component: () => import('@/plugins/router/guards/GuardEvent.vue'),
        children: [
          {
            path: '/:eventId',
            component: () => import('@/layouts/event/LayoutEvent.vue'),
            children: [
              {
                path: '',
                name: 'event',
                component: () => import('@/views/event/EventView.vue'),
              },
            ],
          },
          {
            path: '/:eventId',
            children: [
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
                path: 'event-shuttle-plan',
                name: 'event-shuttle-plan',
                component: () => import('@/views/event/EventShuttlePlan.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
];
