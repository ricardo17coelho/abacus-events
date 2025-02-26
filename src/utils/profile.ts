import type { Profile } from '@/api/types/Profile.ts';

export function getUserFullName(user: Profile) {
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  } else if (user.first_name) {
    return user.first_name;
  } else if (user.last_name) {
    return user.last_name;
  } else {
    return '';
  }
}
