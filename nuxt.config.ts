import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    'nuxt-auth-utils',
  ],
  app: {
    head: {
      titleTemplate: `%s %separator %siteName`,
      templateParams: {
        separator: '|',
        siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Deska',
      },
    },
  },
  runtimeConfig: {
    public: {
      siteName: 'Deska',
      siteUrl: 'http:/localhost:3000',
    },
  },
  css: ['~/assets/css/main.css'],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  colorMode: {
    preference: 'system',
    classSuffix: '',
    disableTransition: true,
  },
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
    clientBundle: {
      icons: ['logos:google-icon'],
    },
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
    display: 'swap',
    download: true,
  },
  components: {
    dirs: [
      {
        path: '~/components',
        ignore: ['**/*.ts'],
      },
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  compatibilityDate: '2025-07-23',
  devtools: {
    enabled: true,
  },
})
