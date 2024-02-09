// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "url";

export default defineNuxtConfig({
  ssr:false,
  runtimeConfig : {
    apiUser: process.env.NUXT_API_USER,
    apiUserPass: process.env.NUXT_API_USER_PASS,
    apiKey : process.env.NUXT_API_KEY,
    G_I18N_KEY:process.env.NUXT_G_I18N_KEY,
    dbHost: process.env.NUXT_DRUPAL_DATABASE_HOST,
    dbPort: parseInt(process.env.NUXT_DRUPAL_DATABASE_PORT_NUMBER),
    dbUser: process.env.NUXT_DRUPAL_DATABASE_USER,
    dbPassword: process.env.NUXT_DRUPAL_DATABASE_PASSWORD,
    validationKey:'',
    encryptionKey: '',
    isLocalHost: process.env.NUXT_IS_LOCALHOST
  },
  devtools: { enabled: true },
  // css:[ '@fortawesome/fontawesome-svg-core/styles.css' ],
  extends:[ './layers/auth', './config' ],
  modules: [
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['stores'],
    presets: [
      {
        from: 'consola',
        imports: ['consola']
      }
    ]
  },
  nitro: { logLevel: 4 },
  ignore:[
    "**/*.stories.{js,cts,mts,ts,jsx,tsx}",
    "**/*.{spec,test}.{js,cts,mts,ts,jsx,tsx}",
    "**/*.d.{cts,mts,ts}",
    "**/.{pnpm-store,vercel,netlify,output,git,cache,data}",
    ".nuxt/analyze",
    ".nuxt",
    "**/-*.*",
    "server/efs"
  ]
})
