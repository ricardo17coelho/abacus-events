// Types
import type { App } from 'vue';
// Plugins & Libraries
import pinia from '@/stores';
import router from './router';
import vuetify from './vuetify';
import i18n from './i18n';

export function registerPlugins(app: App) {
  app.use(pinia);
  app.use(vuetify);
  app.use(i18n);
  app.use(router);
}
