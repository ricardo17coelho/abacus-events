// Simple hyphenation logic: lowercase, trim, replace spaces/special chars
export function toHyphenated(value: string): string {
  if (!value) return '';
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '') // remove non-alphanumerics
    .replace(/\s+/g, '-'); // replace spaces with hyphens
}
