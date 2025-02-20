import { FC, ReactNode, useState } from 'react';
import { LanguageType, useTranslation } from 'react-i18next';

import { LocaleContext } from '../hooks/useLocale';
import i18n from '../configuration';

export const LocaleProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { t } = useTranslation();

    const [language, setLanguage] = useState<LanguageType>('en');

    const toggleLanguage = () => {
        try {
            const languageToSet = language === 'en' ? 'pt' : 'en';
            // localStorage.setItem('@MEET_COMPASS:language', languageToSet);

            setLanguage(languageToSet);
            i18n.changeLanguage(languageToSet);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    // useEffect(() => {
    // 	const language = localStorage.getItem('@MEET_COMPASS:language'); // @ts-ignore
    // 	setSelectedLanguage(language || 'en');
    // 	i18n.changeLanguage(language || 'en');
    // }, []);

    return (
        <LocaleContext.Provider value={{ t, language, toggleLanguage }}>
            {children}
        </LocaleContext.Provider>
    );
};
