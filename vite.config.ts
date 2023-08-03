import { lingui } from '@lingui/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@config': path.resolve(__dirname, './src/config.ts'),
            '@modules': path.resolve(__dirname, './src/modules'),
        },
    },
    plugins: [
        react({
            babel: {
                plugins: ['macros'],
            },
        }),
        lingui(),
        svgr(),
    ],
});
