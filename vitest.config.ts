import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    //setupFiles: ['./vitest.setup.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
    },
    globals: true,
  },
})
