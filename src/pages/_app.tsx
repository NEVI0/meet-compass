import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';

import { AppProvider } from '../contexts/AppContext';

import { GlobalStyles } from '../styles/globals';
import { theme } from '../styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider theme={ theme }>
			<AppProvider>
				<GlobalStyles />
				<Component { ...pageProps } />
			</AppProvider>
		</ThemeProvider>
	);
}

export default App;
