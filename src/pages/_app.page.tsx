import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';

import { AppProvider } from '../contexts/AppContext';

import { GlobalStyles } from '../styles/globals';
import { theme } from '../styles/theme';

import '../i18n';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider theme={ theme }>
			<AppProvider>
				<GlobalStyles />
				<ToastContainer position="top-center" />
				<Component { ...pageProps } />
			</AppProvider>
		</ThemeProvider>
	);
}

export default App;
