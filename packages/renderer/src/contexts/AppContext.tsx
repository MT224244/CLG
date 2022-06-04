import { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useIpc } from '@/hooks/useIpc';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const context = createContext({} as {
    isWindowMaximize: boolean,
    isWindowFocus: boolean,
    windowClose: () => Promise<void>,
    windowMaximize: () => Promise<void>,
    windowMinimize: () => Promise<void>,
});

const Provider = context.Provider;

export const useAppContext = () => {
    return useContext(context);
};

export const AppContext = (props: Props) => {
    const isFirst = useRef(true);
    const [isWindowMaximize, setIsWindowMaximize] = useState(false);
    const [isWindowFocus, setIsWindowFocus] = useState(false);

    const ipc = useIpc();

    if (isFirst.current) {
        isFirst.current = false;

        ipc.on('WINDOW_MAXIMIZE', () => setIsWindowMaximize(true));
        ipc.on('WINDOW_UNMAXIMIZE', () => setIsWindowMaximize(false));
        ipc.on('WINDOW_FOCUS', () => setIsWindowFocus(true));
        ipc.on('WINDOW_BLUR', () => setIsWindowFocus(false));
    }

    const windowClose = useCallback(() => ipc.invoke('WINDOW_CLOSE'), [ipc]);
    const windowMaximize = useCallback(() => ipc.invoke('WINDOW_MAXIMIZE'), [ipc]);
    const windowMinimize = useCallback(() => ipc.invoke('WINDOW_MINIMIZE'), [ipc]);

    return (
        <Provider
            value={{
                isWindowMaximize,
                isWindowFocus,
                windowClose,
                windowMaximize,
                windowMinimize,
            }}
        >
            {props.children}
        </Provider>
    );
};
