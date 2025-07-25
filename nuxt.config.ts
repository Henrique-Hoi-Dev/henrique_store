// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/i18n", "nuxt-icon"],

  // Configurações de runtime
  runtimeConfig: {
    // Variáveis privadas (apenas servidor)
    mercadopagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    mercadopagoWebhookUrl: process.env.MERCADO_PAGO_WEBHOOK_URL,

    // Variáveis públicas (cliente e servidor)
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3000",
      appName: "Henrique Store",
    },
  },

  // @ts-ignore - i18n module configuration
  i18n: {
    locales: [
      {
        code: "pt",
        iso: "pt-BR",
        name: "Português",
        file: "pt.json",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
      },
    ],
    defaultLocale: "pt",
    strategy: "prefix_except_default",
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  css: ["~/assets/css/main.css"],

  app: {
    baseURL: "/",
    head: {
      title: "Henrique Store - E-commerce",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Loja online de produtos diversos" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Henrique Store - E-commerce" },
        {
          property: "og:description",
          content: "Loja online de produtos diversos",
        },
        { property: "og:type", content: "website" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },

  tailwindcss: {
    config: {
      content: [],
      theme: {
        extend: {
          fontFamily: {
            sans: ["Inter", "sans-serif"],
          },
        },
      },
    },
  },

  // Configurações de build
  build: {
    transpile: ["mercadopago"],
  },

  // Configurações de nitro
  nitro: {
    preset: "vercel",
    compressPublicAssets: true,
    minify: true,
    timing: false,
  },
});
