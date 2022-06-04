import type { AppProps } from 'next/app'
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../styles/globals';
import { theme } from '../styles/theme';

export const Layout = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${props => props.theme.colors.body};
`;

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider theme={ theme }>
			<Layout>
				<GlobalStyles />
				<Component { ...pageProps } />
			</Layout>
		</ThemeProvider>
	);
}

export default App;
