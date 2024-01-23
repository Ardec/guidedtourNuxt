// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    'nuxt3-leaflet',
    '@dargmuesli/nuxt-cookie-control'
  ],

  cookieControl: {
    locales: ['en', 'pl'],
  },

  runtimeConfig: {
    public: {
      DATABASE_ID: process.env.QUASAR_DATA
    }
  },
  css: [
    'animate.css' 
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *; @use "~/assets/_fonts.scss" as *;'
        }
      }
    }
  }
})

