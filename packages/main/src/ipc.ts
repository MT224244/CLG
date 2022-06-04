import { ipcMain } from 'electron';

import type { IpcMainInvokeEvent, BrowserWindow } from 'electron';
import type { IpcIHTypes, IpcSOTypes } from '@clg/preload';

function handle<
    T extends keyof IpcIHTypes,
    A extends Parameters<IpcIHTypes[T]>,
    R extends ReturnType<IpcIHTypes[T]>
>(
    channel: T,
    listener: (event: IpcMainInvokeEvent, ...args: A) => R | Promise<R>
): void;
function handle(
    channel: string,
    listener: (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown,
) {
    ipcMain.handle(channel, (event: IpcMainInvokeEvent, ...args: unknown[]) => {
        console.info(`[IPC-handle/${channel}]`);
        return listener(event, ...args);
    });
}

function send<
    T extends keyof IpcSOTypes,
    A extends Parameters<IpcSOTypes[T]>
>(
    channel: T,
    win: BrowserWindow,
    ...args: A
): void;
function send(channel: string, win: BrowserWindow, ...args: unknown[]) {
    console.info(`[IPC-send/${channel}]`);
    win.webContents.send(channel, ...args);
}

export const ipc = {
    handle,
    send,
};
