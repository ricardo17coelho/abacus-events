import { createI18n } from 'vue-i18n';

// app locales
import de from './locales/de.json';
import en from './locales/en.json';
import it from './locales/it.json';
import fr from './locales/fr.json';

const i18n = createI18n({
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

export type AppLocales = 'de' | 'en' | 'fr' | 'it';
export type AppLocalesAvailable = Partial<AppLocales>;

watchEffect(() => {
  document.documentElement.lang = i18n.global.locale.value;
});

export default i18n;
