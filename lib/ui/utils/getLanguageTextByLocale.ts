export function getLanguageTextByLocale(locale: string) {
  switch (locale) {
    case 'de':
      return 'Deutsch';
    case 'en':
      return 'English';
    case 'es':
      return 'Español';
    case 'fr':
      return 'Français';
    case 'it':
      return 'Italiano';
    case 'pt':
      return 'Portugues';
    default:
      return '';
  }
}
