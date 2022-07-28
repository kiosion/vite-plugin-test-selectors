import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import StripTestSelectors from 'vite-plugin-test-selectors';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    StripTestSelectors({
      dev: true
    }),
    Inspect()
  ]
});
