import { lingui } from '@lingui/vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';
import { defineConfig, PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export

const sharedLink = process.env.SHARED_LINK === 'true';
const sharedAlias: {} = sharedLink ? { '@sanctuaryteam/shared': path.resolve(__dirname, './shared/src') } : {};
const sharedOptimizeDeps = sharedLink ? ['@sanctuaryteam/shared'] : [];

export default defineConfig({
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@config': path.resolve(__dirname, './src/config.ts'),
            '@modules': path.resolve(__dirname, './src/modules'),
            ...sharedAlias,
        },
        preserveSymlinks: true,
    },
    plugins: [
        react({
            babel: {
                plugins: ['macros'],
            },
        }),
        lingui(),
        svgr(),
        reactVirtualized(),
    ],
    optimizeDeps: {
        exclude: [...sharedOptimizeDeps],
    },
});

// https://github.com/uber/baseweb/issues/4129#issuecomment-1208168306
const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;

function reactVirtualized(): PluginOption {
    return {
        name: 'flat:react-virtualized',
        // Note: we cannot use the `transform` hook here
        //       because libraries are pre-bundled in vite directly,
        //       plugins aren't able to hack that step currently.
        //       so instead we manually edit the file in node_modules.
        //       all we need is to find the timing before pre-bundling.
        configResolved: async () => {
            const require = createRequire(import.meta.url);
            const reactVirtualizedPath = require.resolve('react-virtualized');
            const { pathname: reactVirtualizedFilePath } = new url.URL(reactVirtualizedPath, import.meta.url);
            const file = reactVirtualizedFilePath
                .replace(
                    path.join('dist', 'commonjs', 'index.js'),
                    path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
                );
            const code = await fs.readFile(file, 'utf-8');
            const modified = code.replace(WRONG_CODE, '');
            await fs.writeFile(file, modified);
        },
    };
}
