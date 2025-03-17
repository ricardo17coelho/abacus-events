import useApi from '@/composables/api';
import type { FindFilter } from '@/api/types/QueryTypes.ts';
import type { EventUser } from './types/EventUser.ts';
import type { Permissions } from './types/Permissions.ts';

export default function useApiEventUsers() {
  const { find, remove, count } = useApi();

  async function getUsersByEventId(id: string) {
    const filters: FindFilter[] = [['event_id', 'eq', id]];
    const select = '...user_id(*)';
    const { data, error } = await find<EventUser>(
      'event_users',
      filters,
      select,
    );

    return {
      data,
      error,
    };
  }

  async function getUsersPermissionsByEventId(eventId: string, userId: string) {
    const filters: FindFilter[] = [
      ['event_id', 'eq', eventId],
      ['user_id', 'eq', userId],
    ];
    const select = '...role_id(permissions)';
    const { error, data } = await find<{ permissions: Permissions }>(
      'event_users',
      filters,
      select,
    );
    if (data && data.length === 1) {
      const permissions = data[0].permissions;
      return { error, data: permissions };
    }
    return { error, data };
  }

  function getCount(id: string) {
    const filters: FindFilter[] = [['event_id', 'eq', id]];
    return count('event_users', filters);
  }

  function getAll(id: string) {
    const filters: FindFilter[] = [['event_id', 'eq', id]];
    const select = `
    *,
    ...user_id(*),
    role:role_id(*)
    `;
    return find<EventUser>('event_users', filters, select);
  }

  function removeById(id: string) {
    return remove('event_users', id, 'user_id');
  }

  return {
    getUsersByEventId,
    getUsersPermissionsByEventId,
    getAll,
    removeById,
    getCount,
  };
}
