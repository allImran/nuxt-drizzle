// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || 'file:./server/database/db.sqlite',
    sqliteDatabasePath: process.env.SQLITE_DATABASE_PATH || 'db/',
  }
})
