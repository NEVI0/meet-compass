import { createContext, useContext } from 'react';
import { LanguageType } from 'react-i18next';
import { TFunction } from 'i18next';

import { isEmpty } from 'lodash';

interface LocaleContextAbstract {
    t: TFunction;
    language: LanguageType;
    toggleLanguage(): void;
}

export const LocaleContext = createContext<LocaleContextAbstract>(
    {} as LocaleContextAbstract,
);

export const useLocale = () => {
    const context = useContext(LocaleContext);

    if (isEmpty(context)) {
        throw new Error(
            'The hook "useLocale" should be called within a "LocaleContext"!',
        );
    }

    return context;
};
