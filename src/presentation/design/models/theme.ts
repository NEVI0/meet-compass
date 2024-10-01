import { ColorsAbstract } from './colors';

import { layout } from '../theme/layout';
import { typography } from '../theme/typography';

export interface ThemeAbstract {
    darkMode: boolean;
    layout: typeof layout;
    typography: typeof typography;
    colors: ColorsAbstract;
}
