import { isProdEnv } from '@/utils';
import router from './router';

export default {
  install() {
    if (!isProdEnv()) return;

    const websiteID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    if (!websiteID) return;

    // Inject Umami script
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.setAttribute('data-website-id', websiteID);
    document.head.appendChild(script);

    // Track route changes
    if (router) {
      router.afterEach((to) => {
        // @ts-expect-error global this
        if (window.umami) window.umami.trackView(to.fullPath);
      });
    }
  },
};
