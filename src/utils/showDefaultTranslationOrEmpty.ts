import i18n from '@/plugins/i18n';

export function showDefaultTranslationOrEmpty(value?: Record<string, string>) {
  if (!value) return '';
  return Object.keys(value).includes(i18n.global.locale.value)
    ? value[i18n.global.locale.value]
    : Object.values(value).length > 0
      ? Object.values(value)[0]
      : '';
}
