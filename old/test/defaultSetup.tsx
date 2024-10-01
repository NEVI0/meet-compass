import React from 'react';
import { render } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

import i18n from '../i18n';

const Providers: React.FC<{ children: any; }> = ({ children }) => {
	return (
		<I18nextProvider i18n={ i18n }>
			<ThemeProvider theme={ theme }>
				{ children }
			</ThemeProvider>
		</I18nextProvider>
	);
}

const createSetup = (ui: React.ReactElement) => {
	return render(ui, { wrapper: Providers });
}

export * from '@testing-library/react';
export { createSetup as render };
