import type { IconProps } from '.';

export const windowClose = (props: IconProps) => (
    <path
        d='
            M8,8 L92,92 M92,8 L8,92
        '
        stroke={props.color}
        strokeWidth={16}
        strokeLinecap='round'
    />
);
