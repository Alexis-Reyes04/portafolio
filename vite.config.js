import { defineConfig } from "vite"
import path, { resolve } from "node:path"
import glob from "glob"

import HtmlCssPurgePlugin from "vite-plugin-purgecss"
import HandlebarPlugin from "vite-plugin-handlebars"

import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function obtenerHtmlFiles() {
  return Object.fromEntries(
    glob
      .sync("**/*.html", {
        ignore: ["dist/**", "node_modules/**"]
      })
      .map((file) => [
        file.replace(".html", ""),
        resolve(__dirname, file)
      ])
  )
}

export default defineConfig({
  base: "/portafolio/",

  appType: "mpa",

  build: {
    rollupOptions: {
      input: obtenerHtmlFiles()
    }
  },

  plugins: [
    HandlebarPlugin({
      partialDirectory: resolve(__dirname, "src/partials")
    }),

    HtmlCssPurgePlugin()
  ]
})