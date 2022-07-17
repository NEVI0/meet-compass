import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

const Providers: React.FC<{ children: any; }> = ({ children }) => {
	return (
		<ThemeProvider theme={ theme }>
			{ children }
		</ThemeProvider>
	);
}

const createSetup = (ui: React.ReactElement) => {
	return render(ui, { wrapper: Providers });
}

export * from '@testing-library/react';
export { createSetup as render };
