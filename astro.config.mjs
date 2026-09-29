// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // TODO: reemplazar por el dominio definitivo (ver context.md §6)
  site: 'https://jesusalmanza.dev',
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
