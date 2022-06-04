import {
    Box as MuiBox,
    colors,
} from '@mui/material';
import { css } from '@emotion/react';
import { SystemButton } from './SystemButton';
import { useAppContext } from '@/contexts/AppContext';

export const TitlebarButtons = () => {
    const {
        isWindowMaximize,
        windowClose,
        windowMaximize,
        windowMinimize,
    } = useAppContext();

    return (
        <MuiBox
            css={css`
                -webkit-app-region: no-drag;
                display: flex;
                margin-left: 5px;
            `}
        >
            <SystemButton
                icon='window-minimize'
                onClick={windowMinimize}
            />
            <SystemButton
                icon={isWindowMaximize ? 'window-restore' : 'window-maximize'}
                onClick={windowMaximize}
            />
            <SystemButton
                icon='window-close'
                hoverColor={colors.red[500]}
                onClick={windowClose}
            />
        </MuiBox>
    );
};
