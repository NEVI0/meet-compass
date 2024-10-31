import 'styled-components';

import { ThemeAbstract } from '@presentation/design';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeAbstract {}
}
