// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clone(value: any) {
  if (!value) return value;
  return JSON.parse(JSON.stringify(value));
}
