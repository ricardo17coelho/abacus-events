import { createI18n } from 'vue-i18n';

// app locales
import de from './locales/de.json';
import en from './locales/en.json';
import it from './locales/it.json';
import fr from './locales/fr.json';

// Supported locales
const messages = { de, en, it, fr };
const availableLocales = Object.keys(messages);

// Detect browser language
const browserLocale = navigator.language.split('-')[0]; // e.g. "en-US" → "en"
const defaultLocale = availableLocales.includes(browserLocale)
  ? browserLocale
  : 'de';

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'de',
  globalInjection: true,
  messages,
});

export type AppLocales = 'de' | 'en' | 'fr' | 'it';
export type AppLocalesAvailable = Partial<AppLocales>;

watchEffect(() => {
  document.documentElement.lang = i18n.global.locale.value;
});

export default i18n;
