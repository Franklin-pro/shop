// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@pinia/nuxt", '@nuxtjs/color-mode'],
 
  colorMode: {
    classSuffix: ''
  },
  css: [
    '@/assets/css/main.css'
  ]
})