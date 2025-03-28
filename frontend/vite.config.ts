import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env': env,
    },
    resolve: {
      alias: {
        '@components': resolve(__dirname, 'src/components'),
        '@context': resolve(__dirname, 'src/context'),
        '@types': resolve(__dirname, 'src/types'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@hooks': resolve(__dirname, 'src/hooks'),
      },
    },
    base: '/',
  };
});
