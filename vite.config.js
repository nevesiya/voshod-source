import { fileURLToPath } from 'node:url'
import * as path from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { createHtmlPlugin } from 'vite-plugin-html'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
    base: '/voshod/', // gh-pages
    plugins: [
        vue(),
        ViteImageOptimizer({
            png: {
                quality: 90
            },
            jpg: {
                quality: 90
            },
            webp: {
                quality: 90
            }
        }),
        createHtmlPlugin({
            inject: {
                data: {
                    injectLink: `
                    <link rel="preload" as="font" href="/src/assets/fonts/Inter-Medium.woff2" type="font/woff2" crossorigin>
                    <link rel="preload" as="font" href="/src/assets/fonts/Lato-Semibold.woff2" type="font/woff2" crossorigin>
                    `
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/_shared.scss";`
            }
        }
    }
})
