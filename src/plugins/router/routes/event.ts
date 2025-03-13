export default [
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
];
