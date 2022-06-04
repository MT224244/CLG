import {
    Box as MuiBox,
    colors,
} from '@mui/material';
import { css } from '@emotion/react';
import { Titlebar } from '@/components/Titlebar';
import { AppContext } from '@/contexts/AppContext';

export const App = () => {
    return (
        <AppContext>
            <Titlebar />
            <MuiBox
                css={({ custom: { titlebarHeight }}) => css`
                    height: calc(100vh - ${titlebarHeight}px);
                    background-color: ${colors.grey[900]};
                `}
            >
                {/*  */}
            </MuiBox>
        </AppContext>
    );
};
