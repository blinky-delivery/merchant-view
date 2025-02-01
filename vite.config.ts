import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from "path"
import Unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Montserrat',
            src: './src/assets/fonts/montserrat/*.ttf',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  }
})
