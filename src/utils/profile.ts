export function getUserFullName(user: {
  first_name: string;
  last_name: string;
}) {
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
