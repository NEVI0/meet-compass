import 'react-i18next';

import en from '@app/presentation/translations/en.json';
import pt from '@app/presentation/translations/pt.json';

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
