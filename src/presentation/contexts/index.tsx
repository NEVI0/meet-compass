import { FC, ReactNode } from 'react';

import { ThemeProvider } from './ThemeContext';
import { ToastProvider } from './ToastContext';
import { LocaleProvider } from './LocaleContext';
import { MeetProvider } from './MeetContext';

import './LocaleContext/configuration';

export const AppContexts: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <ToastProvider>
                <LocaleProvider>
                    <MeetProvider>{children}</MeetProvider>
                </LocaleProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};
