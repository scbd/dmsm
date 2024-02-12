// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "url";

export default defineNuxtConfig({
  ssr:false,
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
