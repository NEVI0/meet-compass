import React from 'react';

import LanguageSwitch from '.';
import { AppProvider } from '../../contexts/AppContext';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/defaultSetup';

import { hasKeyWordInWarning } from '../../utils/functions';

describe('language switch component test', () => {
	const user = userEvent.setup();
	const originalWarn = console.warn.bind(console.warn);

	const MockLanguageSwitch: React.FC<{ testData?: any }> = ({ testData }) => (
		<AppProvider testData={ testData }>
			<LanguageSwitch />
		</AppProvider>
	)

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWordInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('expect to render language switch', () => {
		render(<MockLanguageSwitch />);

		const languageSwitch = screen.getByTestId('languageSwitch');
		expect(languageSwitch).toBeInTheDocument();
	});

	test('expect default language to be English', () => {
		render(<MockLanguageSwitch />);

		const languageInitials = screen.queryByText('en');
		expect(languageInitials).toBeInTheDocument();
	});

	test('expect to change language to be Portuguese', async () => {
		render(<MockLanguageSwitch />);

		const languageSwitch = screen.getByTestId('languageSwitch');
		await user.click(languageSwitch);

		const languageInitials = screen.queryByText('pt');
		expect(languageInitials).toBeInTheDocument();
	});
});
