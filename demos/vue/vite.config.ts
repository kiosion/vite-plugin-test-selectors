import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import StripTestSelectors from 'vite-plugin-test-selectors';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    StripTestSelectors({
      dev: true
    }),
    Inspect()
  ]
});
