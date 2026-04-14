import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest-setup.ts',
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    include: ['src/**/*.test.{ts,tsx}', '__tests__/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', '.agents', '**/node_modules/**']
  }
})
