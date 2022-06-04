import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from '@mui/material';
import {
    Global,
    css,
    ThemeProvider as EmotionThemeProvider,
} from '@emotion/react';
import { App } from '@/App';

const theme = createTheme({
    custom: {
        titlebarHeight: 30,
    },
    palette: {
        mode: 'dark',
    },
});

const styles = css`
html,
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.leaflet-div-icon {
    background: initial;
    border: initial;
}
`;

const container = document.getElementById('root');
if (container) {
    createRoot(container).render(
        <StrictMode>
            <MuiThemeProvider theme={theme}>
                <EmotionThemeProvider theme={theme}>
                    <Global styles={styles} />
                    <App />
                </EmotionThemeProvider>
            </MuiThemeProvider>,
        </StrictMode>,
    );
}
