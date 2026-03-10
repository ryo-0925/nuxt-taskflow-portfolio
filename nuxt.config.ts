import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
  css: ['~~/app/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~~/app/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
})
