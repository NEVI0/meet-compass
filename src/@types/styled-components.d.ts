import 'styled-components';
import { ThemeAbstract } from '../shared/presentation/design';

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeAbstract {}
}
