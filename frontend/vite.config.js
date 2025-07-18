// vite.config.js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {},
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url)),
        },
    },
})