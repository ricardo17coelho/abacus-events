// Types
import type { App } from 'vue';
// Plugins & Libraries
import pinia from '@/stores';
import router from '@/plugins/router';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';

export function registerPlugins(app: App) {
  app.use(pinia);
  app.use(vuetify);
  app.use(i18n);
  app.use(router);
}
