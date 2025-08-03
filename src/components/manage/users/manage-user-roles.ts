import type { UserRoles } from '@/api/types/Profile.ts';

export default function useManageUserRoles() {
  function getRoleColor(role: UserRoles) {
    switch (role) {
      case 'ADMIN':
        return 'indigo';
      case 'HELPER':
        return 'amber';
      default:
        return 'primary';
    }
  }

  function getRoleIcon(role: UserRoles) {
    switch (role) {
      case 'ADMIN':
        return 'mdi-shield-account';
      case 'HELPER':
        return 'mdi-account-hard-hat';
      default:
        return 'mdi-bug';
    }
  }

  return {
    getRoleColor,
    getRoleIcon,
  };
}
