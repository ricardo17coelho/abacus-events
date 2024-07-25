export function merge2ObjectsIfKeysExists(
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  objA: Record<any, any>,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  objB: Record<any, any>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
): Record<any, any> {
  return Object.keys(objA).reduce((a, key) => ({ ...a, [key]: objB[key] }), {});
}
