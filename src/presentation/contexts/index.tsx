import { FC, ReactNode } from 'react';

import { ThemeProvider } from './ThemeContext';
import { LocaleProvider } from './LocaleContext';
import { MeetProvider } from './MeetContext';

import './LocaleContext/configuration';

export const AppContexts: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <LocaleProvider>
                <MeetProvider>{children}</MeetProvider>
            </LocaleProvider>
        </ThemeProvider>
    );
};
