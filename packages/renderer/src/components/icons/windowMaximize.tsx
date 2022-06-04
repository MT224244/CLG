import type { IconProps } from '.';

export const windowMaximize = (props: IconProps) => (
    <path
        d='
            M8,8 H92 V92 H8 Z
        '
        stroke={props.color}
        strokeWidth={16}
        strokeLinejoin='round'
        fill='transparent'
    />
);
