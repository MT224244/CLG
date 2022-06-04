import type { Theme as MuiTheme } from '@mui/material/styles';

interface CustomTheme {
    custom: {
        titlebarHeight: number;
    };
}

declare module '@mui/material/styles' {
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
}

declare module '@emotion/react' {
    interface Theme extends MuiTheme {}
}
