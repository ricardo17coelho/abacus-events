// src/useGoogleAnalytics.ts
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

declare global {
  interface Window {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    dataLayer: any[];
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

export function useGoogleAnalytics(trackingId: string) {
  const route = useRoute();

  onMounted(() => {
    // Initialize Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    // Use rest parameters instead of arguments
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', trackingId);

    // Track initial page load
    window.gtag('event', 'page_view', {
      page_path: route.path
    });
  });

  watch(route, (to) => {
    // Track route changes
    window.gtag('event', 'page_view', {
      page_path: to.path
    });
  });
}
