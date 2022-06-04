import {
    Box as MuiBox,
    Avatar as MuiAvatar,
    Typography as MuiTypography,
    colors,
    alpha,
} from '@mui/material';
import { css } from '@emotion/react';
import { useAppContext } from '@/contexts/AppContext';
import { TitlebarButtons } from './TitlebarButtons';

export const Titlebar = () => {
    const { isWindowFocus } = useAppContext();

    const windowTitle = 'Contributor List Generator';

    return (
        <MuiBox
            css={({ custom: { titlebarHeight }}) => css`
                -webkit-app-region: drag;
                display: grid;
                grid-template-columns:
                    auto
                    minmax(0, auto)
                    1fr
                    auto;
                align-items: center;
                height: ${titlebarHeight}px;
                background: ${alpha(colors.common.black, 0.7)};
                opacity: ${isWindowFocus ? undefined : 0.5};
            `}
        >
            <MuiAvatar
                src='icon.png'
                variant='square'
                css={({ custom: { titlebarHeight }}) => css`
                    width: calc(${titlebarHeight}px - 8px);
                    height: calc(${titlebarHeight}px - 8px);
                    margin-left: 5px;
                `}
            />
            <MuiTypography
                variant='subtitle2'
                color='white'
                css={css`
                    margin-left: 3px;
                    line-height: initial;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                `}
            >{ windowTitle }</MuiTypography>

            <span />

            <TitlebarButtons />
        </MuiBox>
    );
};
