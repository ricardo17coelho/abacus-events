import useApi from '@/composables/api';
import type { Role } from '@/api/types/Role';

export default function useApiRole() {
  const { find, findById, create, update, remove } = useApi();

  function getRoles(range = [0, 10]) {
    return find<Role>('roles', [], '*', range);
  }

  function getRoleById(RoleId: string) {
    return findById<Role>('roles', RoleId, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createRole(form: Record<string, any>) {
    return create<Role>('roles', form);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateRole(id: string, form: Record<string, any>) {
    return update<Role>('roles', {
      id,
      ...form,
    });
  }

  function removeRole(id: string) {
    return remove('roles', id);
  }

  return {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    removeRole,
  };
}
