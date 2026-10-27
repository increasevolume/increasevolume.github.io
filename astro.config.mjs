import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://increasevolume.github.io',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    optimizeDeps: {
      include: ['@breezystack/lamejs'],
    },
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          pt: 'pt',
          de: 'de',
          fr: 'fr',
          ja: 'ja',
          zh: 'zh',
          ru: 'ru',
        },
      },
    }),
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'og-image.svg', 'robots.txt'],
      manifest: {
        name: 'Increase Audio Volume Online | Free MP3 Volume Booster',
        short_name: 'IncreaseVolume',
        description: 'Amplify quiet MP3, WAV, M4A, FLAC, and OGG audio files up to 500% (+14 dB) directly in your browser. 100% client-side & offline-ready.',
        theme_color: '#202734',
        background_color: '#F6FBF2',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
      },
    }),
  ],
});
