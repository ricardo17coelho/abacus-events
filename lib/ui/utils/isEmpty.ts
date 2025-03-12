export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined || value === '') {
    return true;
  }

  return Array.isArray(value) && value.length === 0;
}
