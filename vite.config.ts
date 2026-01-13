import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.{test,spec}.{js,ts,tsx}',
      'src/**/__tests__/**/*.{js,ts,tsx}',
    ],
  },
})
