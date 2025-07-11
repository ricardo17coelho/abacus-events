import { fileURLToPath } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import AutoImport from 'unplugin-auto-import/vite';
import circleDependency from 'vite-plugin-circular-dependency';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('vite:mode', mode);

  return {
    plugins: [
      vue({
        template: {
          transformAssetUrls,
        },
      }),
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      AutoImport({
        // targets to transform
        include: [/\.[tj]s?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        eslintrc: {
          enabled: true,
        },
      }),
      circleDependency({
        outputFilePath: './circleDep',
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.icon', 'apple-touch-icon.png'],
        manifest: {
          name: 'Abacus Events',
          short_name: 'AbacusEvents',
          description: 'Your event guid',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: '192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 3000000,
        },
      }),
    ],
    server: {
      port: Number(env.VITE_PORT),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@lib': fileURLToPath(new URL('./lib', import.meta.url)),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        supported: {
          'top-level-await': true,
        },
      },
    },
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    },
  };
});
