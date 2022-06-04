import { ipcRenderer } from 'electron';

import type { IpcIHTypes, IpcSOTypes, Ipc } from '@clg/preload';

function invoke<T extends keyof IpcIHTypes>(
    channel: T,
    ...args: Parameters<IpcIHTypes[T]>
): Promise<ReturnType<IpcIHTypes[T]>>;
function invoke(channel: string, ...args: unknown[]) {
    console.info(`[IPC-invoke/${channel}]`);
    return ipcRenderer.invoke(channel, ...args);
}

function on<T extends keyof IpcSOTypes>(
    channel: T,
    listener: (event: Electron.IpcRendererEvent, ...args: Parameters<IpcSOTypes[T]>) => void
): void;
function on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) {
    ipcRenderer.on(channel, (event, ...args) => {
        console.info(`[IPC-on/${channel}]`);
        return listener(event, ...args);
    });
}

export const ipc: Ipc = {
    invoke,
    on,
};
