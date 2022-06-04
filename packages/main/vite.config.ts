import { defineConfig } from 'vite';
import path from 'path';
import checker from 'vite-plugin-checker';
import autoExternal from 'rollup-plugin-auto-external';

const mode = process.env.MODE = process.env.MODE ?? 'production';
const isDev = mode === 'development';

export default defineConfig({
    mode,
    root: __dirname,
    envDir: process.cwd(),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        checker({
            typescript: {
                root: __dirname,
                tsconfigPath: 'tsconfig.json',
            },
            eslint: {
                lintCommand: `eslint "${path.resolve(__dirname, 'src/**/*.ts')}"`,
            },
        }),
        autoExternal({
            packagePath: __dirname,
            dependencies: false,
        }),
    ],
    build: {
        target: `ESNext`,
        outDir: '../../dist/main',
        assetsDir: '.',
        minify: !isDev,
        sourcemap: isDev,
        emptyOutDir: true,
        lib: {
            entry: 'src/background.ts',
            formats: ['cjs'],
        },
        rollupOptions: {
            external: [
                'electron',
            ],
            output: {
                entryFileNames: '[name].cjs',
            },
        },
    },
});
