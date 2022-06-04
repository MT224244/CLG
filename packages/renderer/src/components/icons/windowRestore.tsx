import type { IconProps } from '.';

export const windowRestore = (props: IconProps) => (
    <path
        d='
            M8,32 H68 V92 H8 Z
            M32,32 V8 H92 V68 H68
        '
        stroke={props.color}
        strokeWidth={16}
        strokeLinejoin='round'
        fill='transparent'
    />
);
