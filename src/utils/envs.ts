export function isDevEnv() {
  return import.meta.env.DEV;
}

export function isProdEnv() {
  return import.meta.env.PROD;
}
