// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Dirección pública actual (Netlify). Si se conecta un dominio propio, cambiarla aquí y en public/robots.txt.
  site: 'https://jesusalmanza.netlify.app',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es-MX' } },
    }),
  ],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
