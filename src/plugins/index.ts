// Types
import type { App } from 'vue';
// Plugins & Libraries
import pinia from '@/stores';
import vuetify from './vuetify';
import i18n from './i18n';
import { isProdEnv } from '@/utils';
import { VueUmamiPlugin } from '@jaseeey/vue-umami-plugin';
import router from './router';

export function registerPlugins(app: App) {
  app.use(pinia);
  app.use(vuetify);
  app.use(i18n);
  if (isProdEnv()) {
    app.use(VueUmamiPlugin, {
      websiteID: import.meta.env.VITE_UMAMI_WEBSITE_ID,
      scriptSrc: 'https://cloud.umami.is/script.js',
      router,
    });
  }
  app.use(router);
}
