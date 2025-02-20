import 'styled-components';

import { ThemeAbstract } from '@app/presentation/design';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeAbstract {}
}
