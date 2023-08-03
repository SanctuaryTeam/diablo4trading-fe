import '@fontsource/alegreya-sans/400.css';
import '@fontsource/alegreya-sans/500.css';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React, { useMemo } from 'react';
import { createAppTheme } from './theme.helper';

interface ThemeProps {
    children?: React.ReactNode;
}

export const Theme: React.FC<ThemeProps> = ({ children }) => {
    const theme = useMemo(() => {
        return createAppTheme({
            disableAnimations: false,
        });
    }, []);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
