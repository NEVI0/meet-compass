import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@presentation/translations/en.json';
import pt from '@presentation/translations/pt.json';

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: {
        en: { translation: en },
        pt: { translation: pt },
    },
});

export default i18n;
