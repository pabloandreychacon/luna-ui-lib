import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LunaUILib',
      fileName: 'luna-ui-lib',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Ensure we don't bundle dependencies that the user should provide
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
