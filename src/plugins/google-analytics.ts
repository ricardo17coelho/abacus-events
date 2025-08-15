// src/useGoogleAnalytics.ts
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: GtagArgs) => void;
  }
}

// Define the possible gtag arguments
type GtagArgs =
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?];

export function useGoogleAnalytics(trackingId: string) {
  const route = useRoute();

  onMounted(() => {
    if (!document.querySelector(`script[src*="${trackingId}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: GtagArgs) {
        window.dataLayer.push(args);
      };

      window.gtag('js', new Date());
      window.gtag('config', trackingId, {
        send_page_view: false,
      });
    }

    sendPageView(route.fullPath);
  });

  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      if (newPath !== oldPath) {
        sendPageView(newPath);
      }
    },
  );

  function sendPageView(path: string) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
}
