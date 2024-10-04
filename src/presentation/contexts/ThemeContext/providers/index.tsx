import { FC, ReactNode, useCallback, useState } from 'react';

import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

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
                {children}
            </StyledComponentsThemeProvider>
        </ThemeContext.Provider>
    );
};
