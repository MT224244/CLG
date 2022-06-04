import { Ipc } from '@clg/preload';

type WindowWithIpc =
    Window &
    typeof globalThis &
    { ipc: Ipc };

export const useIpc = () => (window as WindowWithIpc).ipc;
