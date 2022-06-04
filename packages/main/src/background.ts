import { app, BrowserWindow } from 'electron';
import path from 'path';
import { ipc } from '@/ipc';
import { initLogger, rendererLogger } from '@/logger';

const isDev = import.meta.env.DEV;

if (isDev) {
    app.setPath(
        'userData',
        path.join(app.getPath('appData'), `${app.getName()}-dev`),
    );
}

initLogger();

let win: BrowserWindow | null = null;

const createWindow = async () => {
    win = new BrowserWindow({
        frame: false,
        show: false,
        backgroundColor: '#424242',
        webPreferences: {
            preload: path.join(__dirname, '../../dist/preload/index.cjs'),
            spellcheck: false,
        },
    });

    if (isDev) win.webContents.openDevTools();

    win.on('maximize', () => win && ipc.send('WINDOW_MAXIMIZE', win));
    win.on('unmaximize', () => win && ipc.send('WINDOW_UNMAXIMIZE', win));
    win.on('focus', () => win && ipc.send('WINDOW_FOCUS', win));
    win.on('blur', () => win && ipc.send('WINDOW_BLUR', win));

    win.on('ready-to-show', () => {
        if (!win) return;
        win.show();
        ipc.send(win.isMaximized() ? 'WINDOW_MAXIMIZE' : 'WINDOW_UNMAXIMIZE', win);
        ipc.send(win.isFocused() ? 'WINDOW_FOCUS' : 'WINDOW_BLUR', win);
    });

    win.webContents.on('console-message', (_event, level, message) => {
        if (level === 0)
            rendererLogger.debug(message);
        else if (level === 1)
            rendererLogger.info(message);
        else if (level === 2)
            rendererLogger.warn(message);
        else if (level === 3)
            rendererLogger.error(message);
    });

    if (import.meta.env.VITE_DEV_SERVER_URL) {
        await win.loadURL(import.meta.env.VITE_DEV_SERVER_URL as string);
    }
    else {
        const url = new URL('../dist/renderer/index.html', `file://${__dirname}`);
        await win.loadURL(url.toString());
    }
};

app.on('ready', () => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipc.handle('GET_APPLICATION_INFO', () => {
    return {
        name: app.getName(),
        version: app.getVersion(),
    };
});
ipc.handle('WINDOW_CLOSE', () => {
    win?.close();
});
ipc.handle('WINDOW_MAXIMIZE', () => {
    if (win?.isMaximized()) win.unmaximize();
    else win?.maximize();
});
ipc.handle('WINDOW_MINIMIZE', () => {
    win?.minimize();
});
