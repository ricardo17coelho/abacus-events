import { fileURLToPath } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import AutoImport from 'unplugin-auto-import/vite';
import circleDependency from 'vite-plugin-circular-dependency';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { resolve, dirname } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('vite:mode', mode);

  return {
    plugins: [
      vue({
        template: {
          transformAssetUrls
        }
      }),
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss'
        }
      }),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        include: resolve(
          dirname(fileURLToPath(import.meta.url)),
          './src/plugins/i18n/locales/**'
        )
      }),
      AutoImport({
        // targets to transform
        include: [/\.[tj]s?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        eslintrc: {
          enabled: true
        }
      }),
      circleDependency({
        outputFilePath: './circleDep'
      })
    ],
    server: {
      port: Number(env.VITE_PORT)
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        supported: {
          'top-level-await': true
        }
      }
    },
    esbuild: {
      supported: {
        'top-level-await': true
      }
    }
  };
});
