import {
    Button as MuiButton,
    colors,
    alpha,
} from '@mui/material';
import { css } from '@emotion/react';
import { Icon, IconKey } from './Icon';
import type { MouseEventHandler } from 'react';

type Props = {
    icon: IconKey;
    hoverColor?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const SystemButton = (props: Props) => (
    <MuiButton
        disableRipple
        css={({ custom: { titlebarHeight }}) => css`
            width: ${titlebarHeight * 1.5}px;
            height: ${titlebarHeight}px;
            min-width: 0;
            padding: 4px;
            border-radius: 0;
            &:hover {
                background-color: ${props.hoverColor ?? alpha(colors.common.white, 0.2)};
            }
        `}
        onClick={props.onClick}
    >
        <Icon
            name={props.icon}
            color='white'
            size='13px'
        />
    </MuiButton>
);
