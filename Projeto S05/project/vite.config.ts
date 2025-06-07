// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Adicione o nome do seu repositório aqui
  base: '/ProjetoS05/', // Exemplo: se a URL for https://joaumpdr.github.io/ProjetoS05/
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
