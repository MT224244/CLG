import { build } from 'vite';
import { replaceConsoleLog } from './vitePlugins/replaceConsoleLog';

const mode = process.env.MODE = 'production';

const configFiles = [
    'packages/main/vite.config.ts',
    'packages/preload/vite.config.ts',
    'packages/renderer/vite.config.ts',
];

(async () => {
    await Promise.all(configFiles.map(configFile => build({
        mode,
        plugins: [
            replaceConsoleLog(),
        ],
        configFile,
    })));
})();
