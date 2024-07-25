import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import AutoImport from 'unplugin-auto-import/vite';
import circleDependency from 'vite-plugin-circular-dependency';

// https://vitejs.dev/config/
export default defineConfig({
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
