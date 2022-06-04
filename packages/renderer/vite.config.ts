import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import autoExternal from 'rollup-plugin-auto-external';

const mode = process.env.MODE = process.env.MODE ?? 'production';
const isDev = mode === 'development';

export default defineConfig({
    mode,
    root: path.resolve(__dirname, 'src'),
    publicDir: '../public',
    base: '',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimizeDeps: {
        include: [
            '@emotion/react/jsx-dev-runtime',
        ],
    },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
        }),
        checker({
            typescript: {
                root: __dirname,
                tsconfigPath: 'tsconfig.json',
            },
            eslint: {
                lintCommand: `eslint "${path.resolve(__dirname, 'src/**/*.{ts,tsx}')}"`,
            },
        }),
        autoExternal({
            packagePath: __dirname,
            dependencies: false,
        }),
    ],
    build: {
        target: 'chrome94',
        outDir: '../../../dist/renderer',
        minify: !isDev,
        sourcemap: isDev,
        emptyOutDir: true,
    },
});
