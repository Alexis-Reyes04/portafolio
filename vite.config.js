import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import * as glob from "glob";

import HtmlCssPurgePlugin from "vite-plugin-purgecss";
import HandlebarPlugin from "vite-plugin-handlebars";

function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob
            .sync("./**/*.html", {
                ignore: [
                    "./dist/**",
                    "./node_modules/**"
                ]
            })
            .map((file) => [
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file)
            ])
    );
}

export default defineConfig({
    base: "/pw2_portafolio/",   // sin esto en git pages sale error 404 

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
});