import Home from './index.page';
import { theme } from '../../styles/theme';

import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const formInputs = {
	userName: () => screen.getByTestId('userNameInput'),
	userEmail: () => screen.getByTestId('userEmailInput'),
	meetName: () => screen.getByTestId('meetNameInput')
}

describe('home page tests', () => {
	beforeEach(() => {
		useRouter.mockImplementation(() => ({
			query: {}
		}));

		render(
			<ThemeProvider theme={ theme }>
				<Home />
			</ThemeProvider>
		);
	});

	test('check if start meet button is disabled when click without form values', async () => {
		const user = userEvent.setup();
		const startMeetButton = screen.getByTestId('startMeetButton');

		await user.click(startMeetButton);
		expect(startMeetButton).toBeDisabled();
	});

	test('check if start meet button become disabled with invalid form values', async () => {
		const startMeetButton = screen.getByTestId('startMeetButton');		
		const user = userEvent.setup();

		await user.type(formInputs.userName(), ' ');
		await user.type(formInputs.userEmail(), 'valid@gmail.com');
		await user.type(formInputs.meetName(), 'Valid meet name');
		
		expect(startMeetButton).toBeDisabled();
	});

	test('check if start meet button become enabled with valid form values', async () => {		
		const startMeetButton = screen.getByTestId('startMeetButton');		
		const user = userEvent.setup();

		await user.type(formInputs.userName(), 'Valid user name');
		await user.type(formInputs.userEmail(), 'valid@gmail.com');
		await user.type(formInputs.meetName(), 'Valid meet name');
		
		expect(startMeetButton).not.toBeDisabled();
	});
});
