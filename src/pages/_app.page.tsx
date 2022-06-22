import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';

import { AppProvider } from '../contexts/AppContext';
import { MeetProvider } from '../contexts/MeetContext';

import { GlobalStyles } from '../styles/globals';
import { theme } from '../styles/theme';

import '../i18n';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider theme={ theme }>
			<AppProvider>
				<MeetProvider>
					<GlobalStyles />
					<ToastContainer position="top-center" />
					<Component { ...pageProps } />
				</MeetProvider>
			</AppProvider>
		</ThemeProvider>
	);
}

export default App;
