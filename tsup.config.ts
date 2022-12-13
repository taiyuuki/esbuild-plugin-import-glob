import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'esnext',
  splitting: false,
  clean: true,
  dts: true,
})