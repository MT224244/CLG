import { spawn } from 'child_process';
import { createServer, build, createLogger } from 'vite';
import electron from 'electron';
import deepmerge from 'deepmerge';
import { replaceConsoleLog } from './vitePlugins/replaceConsoleLog';

import type { ChildProcessWithoutNullStreams } from 'child_process';
import type { ViteDevServer, UserConfig, InlineConfig } from 'vite';

const mode = process.env.MODE = 'development';

const logger = createLogger('error', { prefix: '[vite]' });

const common: UserConfig = {
    mode,
    build: {
        watch: {},
    },
    plugins: [
        replaceConsoleLog(),
    ],
};

const configFile = {
    main: 'packages/main/vite.config.ts',
    preload: 'packages/preload/vite.config.ts',
    renderer: 'packages/renderer/vite.config.ts',
};

let mainProcess: ChildProcessWithoutNullStreams | null = null;

const spawnMain = () => {
    mainProcess = spawn(`${electron}`, ['.']);
    mainProcess.on('exit', () => process.exit());
    mainProcess.stdout.on('data', data => {
        console.info(data.toString().trim());
    });
    mainProcess.stderr.on('data', data => {
        logger.error(data.toString().trim(), { timestamp: true });
    });
};

const launchRendererServer = async () => {
    const devServer = await createServer(deepmerge<InlineConfig>(common, {
        configFile: configFile.renderer,
    }));

    await devServer.listen();

    const host = devServer.config.server.host ?? 'localhost';
    const port = devServer.config.server.port;
    process.env.VITE_DEV_SERVER_URL = `http://${host}:${port}/`;

    return devServer;
};

const watchMain = async () => {
    await build(deepmerge<InlineConfig>(common, {
        configFile: configFile.main,
        plugins: [
            {
                name: 'watch-main',
                writeBundle() {
                    if (mainProcess !== null) {
                        mainProcess.kill();
                        mainProcess = null;
                    }
                    spawnMain();
                },
            },
        ],
    }));
};

const watchPreload = async (rendererServer: ViteDevServer) => {
    await build(deepmerge<InlineConfig>(common, {
        configFile: configFile.preload,
        plugins: [{
            name: 'reload-renderer',
            writeBundle() {
                rendererServer.ws.send({ type: 'full-reload' });
            },
        }],
    }));
};

(async () => {
    try {
        const rendererServer = await launchRendererServer();
        await watchPreload(rendererServer);
        await watchMain();
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e);
        }
    }
})();
