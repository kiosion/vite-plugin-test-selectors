import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import StripTestSelectors from 'vite-plugin-test-selectors';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    StripTestSelectors({
      dev: true
    }),
    Inspect()
  ]
});
