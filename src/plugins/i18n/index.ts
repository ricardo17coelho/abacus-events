import { createI18n } from 'vue-i18n';

// app locales
import de from './locales/de.json';
import en from './locales/en.json';
import it from './locales/it.json';
import fr from './locales/fr.json';


const i18n = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'de',
  globalInjection: true,
  messages: {
    de,
    en,
    it,
    fr
  }
});

export type AppLocales = 'de' | 'en'  | 'fr' | 'it' ;
export type AppLocalesAvailable = Partial<AppLocales>;

export default i18n;
