import 'react-toastify/dist/ReactToastify.css';

import { FC, ReactNode, useMemo } from 'react';

import { toast, ToastContainer, ToastOptions } from 'react-toastify';

import { ToastContext } from '../hooks/useToast';
import { useTheme } from '@presentation/contexts/ThemeContext';

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { theme } = useTheme();

    const settings = useMemo<ToastOptions>(
        () => ({
            theme: theme.darkMode ? 'dark' : 'light',
            bodyStyle: {
                fontFamily: theme.typography.font.family,
                fontSize: theme.typography.size.normal,
                fontWeight: 500,
                textAlign: 'center',
            },
        }),
        [theme],
    );

    const success = (message: string) => {
        toast(message, {
            ...settings,
            progressStyle: { backgroundColor: theme.colors.others.green },
        });
    };

    const error = (message: string) => {
        toast(message, {
            ...settings,
            progressStyle: { backgroundColor: theme.colors.others.red },
        });
    };

    return (
        <ToastContext.Provider
            value={{
                toast: { success, error },
            }}
        >
            <ToastContainer position="top-center" />
            {children}
        </ToastContext.Provider>
    );
};
