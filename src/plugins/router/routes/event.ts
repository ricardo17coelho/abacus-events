export default [
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
            path: 'event-schedule',
            name: 'event-schedule',
            component: () => import('@/views/event/EventSchedule.vue'),
          },
        ],
      },
    ],
  },
];
