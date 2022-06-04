import { contextBridge } from 'electron';
import { ipc } from '@/ipc';

import type { Preloads } from '@clg/preload';

const preloads: Preloads = {
    ipc,
};

for (const key of Object.keys(preloads) as (keyof Preloads)[]) {
    contextBridge.exposeInMainWorld(key, preloads[key]);
}
