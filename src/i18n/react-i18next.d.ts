import 'react-i18next';

import en from './translations/en.json';
import pt from './translations/pt.json';

declare module 'react-i18next' {
	interface CustomTypeOptions {
		defaultNS: 'en';
		resources: {
			en: typeof en;
			pt: typeof pt;
		};
	}
}
