import 'react-toastify/dist/ReactToastify.css';

import { FC, ReactNode, useCallback, useState } from 'react';

import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import { ThemeContext } from '../hooks/useTheme';

import { createTheme, DefaultStyles } from '@presentation/design';

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState(createTheme());

    const toggleTheme = useCallback(() => {
        setTheme(createTheme(!theme.darkMode));
    }, [theme.darkMode]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledComponentsThemeProvider theme={theme}>
                <DefaultStyles />
                <ToastContainer position="top-center" />

                {children}
            </StyledComponentsThemeProvider>
        </ThemeContext.Provider>
    );
};
