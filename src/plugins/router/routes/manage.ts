import LayoutManage from '@/layouts/manage/LayoutManage.vue';

export default [
  {
    path: '/',
    component: () => import('@/plugins/router/guards/GuardManage.vue'),
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
      },
      {
        path: 'manage',
        component: LayoutManage,
        children: [
          {
            path: '',
            name: 'manage',
            component: () => import('@/views/DashboardView.vue'),
          },
          {
            path: 'parking-lots',
            name: 'manage-parking-lots',
            component: () => import('@/views/manage/ManageParkingLots.vue'),
          },
          {
            path: 'events',
            children: [
              {
                path: '',
                name: 'manage-events',
                component: () =>
                  import('@/views/manage/events/ManageEvents.vue'),
              },
              {
                path: ':eventId',
                component: () =>
                  import('@/plugins/router/guards/GuardEvent.vue'),
                children: [
                  {
                    path: '',
                    name: 'manage-events-id',
                    component: () =>
                      import('@/views/manage/events/ManageEvent.vue'),
                    redirect: { name: 'manage-events-id-settings' },
                    children: [
                      {
                        path: 'brand',
                        name: 'manage-events-id-brand',
                        component: () =>
                          import('@/views/manage/events/ManageEventBrand.vue'),
                      },
                      {
                        path: 'persons',
                        name: 'manage-events-id-persons',
                        component: () =>
                          import(
                            '@/views/manage/events/ManageEventPersons.vue'
                          ),
                      },
                      {
                        path: 'settings',
                        name: 'manage-events-id-settings',
                        component: () =>
                          import(
                            '@/views/manage/events/ManageEventSettings.vue'
                          ),
                      },
                      {
                        path: 'users',
                        name: 'manage-events-id-users',
                        component: () =>
                          import('@/views/manage/events/ManageEventUsers.vue'),
                      },
                      {
                        path: 'contacts',
                        name: 'manage-events-id-contacts',
                        component: () =>
                          import(
                            '@/views/manage/events/ManageEventContacts.vue'
                          ),
                      },
                      {
                        path: 'files',
                        name: 'manage-events-id-files',
                        component: () =>
                          import('@/views/manage/events/ManageEventFiles.vue'),
                      },
                      {
                        path: 'guest-list',
                        name: 'manage-events-id-guest-list',
                        component: () =>
                          import(
                            '@/views/manage/events/ManageEventGuestList.vue'
                          ),
                      },
                      {
                        path: 'parking-lots',
                        name: 'manage-events-id-parking-lots',
                        component: () =>
                          import(
                            '@/views/manage/events/ManageEventParkingLots.vue'
                          ),
                      },
                      {
                        path: 'event-schedule',
                        name: 'manage-events-id-schedule',
                        component: () =>
                          import(
                            '@/views/manage/events/ManageEventSchedule.vue'
                          ),
                      },
                      {
                        path: 'program',
                        name: 'manage-events-id-program',
                        component: () =>
                          import(
                            '@/views/manage/events/ManageEventProgram.vue'
                          ),
                      },
                      {
                        path: 'informations',
                        name: 'manage-events-id-informations',
                        component: () =>
                          import(
                            '@/views/manage/events/ManageEventInformations.vue'
                          ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: 'users',
            name: 'manage-users',
            component: () => import('@/views/manage/ManageUsers.vue'),
          },
          {
            path: 'roles',
            name: 'manage-roles',
            component: () => import('@/views/manage/ManageRoles.vue'),
          },
        ],
      },
    ],
  },
];
