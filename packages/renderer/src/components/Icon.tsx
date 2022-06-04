import { css } from '@emotion/react';
import {
    windowClose,
    windowMaximize,
    windowRestore,
    windowMinimize,
} from './icons';

const icons = {
    'window-close': windowClose,
    'window-maximize': windowMaximize,
    'window-restore': windowRestore,
    'window-minimize': windowMinimize,
};

export type IconKey = keyof typeof icons;

type Props = {
    name: IconKey;
    color?: string;
    size?: string;
};

export const Icon = (props: Props) => {
    const IconData = icons[props.name];
    const size = props.size ?? '100%';
    const color = props.color ?? 'white';

    return (
        <svg
            viewBox='0 0 100 100'
            css={css`
                width: ${size};
                height: ${size};
                overflow: visible;
            `}
        >
            <IconData color={color} />
        </svg>
    );
};
