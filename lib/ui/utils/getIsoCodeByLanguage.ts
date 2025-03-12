export function getIsoCodeByLanguage(language: string) {
  let locale = '';
  switch (language.toLowerCase()) {
    case 'fr':
      locale = 'fr';
      break;
    case 'it':
      locale = 'it';
      break;
    case 'de':
      locale = 'de';
      break;
    case 'en':
      locale = 'en';
      break;
    default:
      locale = language;
      break;
  }
  return locale;
}
