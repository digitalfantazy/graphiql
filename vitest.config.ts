import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './app/__tests__/setup.ts',
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage',
    },
  },
});
