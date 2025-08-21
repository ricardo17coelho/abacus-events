/// <reference types="vite/client" />
interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;

  readonly VITE_DEV_USER_EMAIL: string;
  readonly VITE_DEV_USER_PW: string;
  readonly VITE_UMAMI_WEBSITE_ID: string;

  readonly VITE_AUTH_SIGN_UP_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
