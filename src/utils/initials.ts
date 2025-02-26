import { isNullOrUndefined } from './isNullOrUndefined';

export function getInitials(name: string) {
  if (isNullOrUndefined(name)) return name;
  return (
    name
      .match(/(\b\S)?/g)
      ?.join('')
      .match(/(^\S|\S$)?/g)
      ?.join('') || ''
  );
}
