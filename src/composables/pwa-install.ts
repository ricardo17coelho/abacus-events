import { onMounted, ref } from 'vue';

export default function usePWAinstall() {
  const canInstall = ref(false);
  const isSafariManualInstall = ref(false);
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  onMounted(() => {
    // Detect Safari (iOS or macOS)
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isMac = /macintosh/.test(ua) && 'ontouchend' in document;
    const isSafari =
      ua.includes('safari') && !ua.includes('crios') && !ua.includes('fxios');

    if ((isIos || isMac) && isSafari) {
      isSafariManualInstall.value = true;
      canInstall.value = true; // So you can show instructions
      return;
    }

    // Handle Chrome/Edge install prompt
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      canInstall.value = true;
    });

    window.addEventListener('appinstalled', () => {
      console.log('App was installed');
    });
  });

  const installPWA = async () => {
    if (!deferredPrompt) return;
    void deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    canInstall.value = false;
  };

  return {
    canInstall,
    isSafariManualInstall,
    installPWA,
  };
}

// Add the type for the event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}
