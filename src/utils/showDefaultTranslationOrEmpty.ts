import i18n from '@/plugins/i18n';

export function showDefaultTranslationOrEmpty(value?: Record<string, string>) {
  if (!value) return '';
  const locale = i18n.global.locale;
  return Object.keys(value).includes(locale)
    ? value[locale]
    : Object.values(value).length > 0
      ? Object.values(value)[0]
      : '';
}
