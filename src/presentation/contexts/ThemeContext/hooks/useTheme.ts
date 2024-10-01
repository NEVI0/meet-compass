import { createContext, useContext } from 'react';
import { isEmpty } from 'lodash';

import { ThemeAbstract } from '@presentation/design';

interface ThemeContextAbstract {
    theme: ThemeAbstract;
    toggleTheme(): void;
}

export const ThemeContext = createContext<ThemeContextAbstract>(
    {} as ThemeContextAbstract,
);

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (isEmpty(context)) {
        throw new Error(
            'The hook "useTheme" should be called within a "ThemeContext"!',
        );
    }

    return context;
};
