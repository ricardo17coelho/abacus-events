import { type App } from 'vue';
import { isProdEnv } from '@/utils';
import { VueUmamiPlugin } from '@jaseeey/vue-umami-plugin';
import router from './router';

export default {
  install(app: App) {
    console.log('installing umami plugin', isProdEnv());

    if (isProdEnv()) {
      app.use(VueUmamiPlugin, {
        websiteID: import.meta.env.VITE_UMAMI_WEBSITE_ID,
        scriptSrc: 'https://cloud.umami.is/script.js',
        router,
      });
    }
  },
};
