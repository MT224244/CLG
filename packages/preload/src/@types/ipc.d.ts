import type { IpcRendererEvent } from 'electron';

export type Ipc = {
    invoke<T extends keyof IpcIHTypes>(channel: T, ...args: Parameters<IpcIHTypes[T]>): Promise<ReturnType<IpcIHTypes[T]>>;
    on<T extends keyof IpcSOTypes>(
        channel: T,
        listener: (event: IpcRendererEvent, ...args: Parameters<IpcSOTypes[T]>) => ReturnType<IpcSOTypes[T]>
    ): void;
};

export type ApplicationInfo = {
    name: string;
    version: string;
};

export type IpcIHTypes = {
    WINDOW_MINIMIZE(): void;
    WINDOW_MAXIMIZE(): void;
    WINDOW_CLOSE(): void;
    GET_APPLICATION_INFO(): ApplicationInfo;
};

export type IpcSOTypes = {
    WINDOW_MAXIMIZE(): void;
    WINDOW_UNMAXIMIZE(): void;
    WINDOW_FOCUS(): void;
    WINDOW_BLUR(): void;
};
