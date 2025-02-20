import { createContext, useContext } from 'react';
import { isEmpty } from 'lodash';

interface ToastContextAbstract {
    toast: {
        success: (message: string) => void;
        error: (message: string) => void;
    };
}

export const ToastContext = createContext<ToastContextAbstract>(
    {} as ToastContextAbstract,
);

export const useToast = () => {
    const context = useContext(ToastContext);

    if (isEmpty(context)) {
        throw new Error(
            'The hook "useToast" should be called within a "ToastContext"!',
        );
    }

    return context;
};
