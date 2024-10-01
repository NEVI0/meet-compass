import 'react-i18next';

import en from '@presentation/translations/en.json';
import pt from '@presentation/translations/pt.json';

declare module 'react-i18next' {
    export type LanguageType = 'en' | 'pt';

    interface CustomTypeOptions {
        defaultNS: 'en';
        resources: {
            en: typeof en;
            pt: typeof pt;
        };
    }
}
