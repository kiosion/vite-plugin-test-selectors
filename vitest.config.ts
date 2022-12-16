import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': r('src')
    }
  }
});
