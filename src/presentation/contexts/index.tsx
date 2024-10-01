import { FC, ReactNode } from 'react';

import { ThemeProvider } from './ThemeContext';
import { LocaleProvider } from './LocaleContext';

import './LocaleContext/configuration';

export const AppContexts: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
    );
};
