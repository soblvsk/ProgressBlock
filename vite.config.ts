import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ProgressBlock',
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]-[local]_[hash:base64:5]',
      hashPrefix: 'prefix',
    },
  },
});
