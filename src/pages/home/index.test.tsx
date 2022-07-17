import Home from './index.page';
import { theme } from '../../styles/theme';

import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const formInputs = {
	userName: () => screen.getByTestId('userNameInput'),
	userEmail: () => screen.getByTestId('userEmailInput'),
	meetName: () => screen.getByTestId('meetNameInput'),
	meetId: () => screen.getByTestId('meetIdInput')
}

const TestComponent = () => (
	<ThemeProvider theme={ theme }>
		<Home />
	</ThemeProvider>
);

const DEFAULT_MEET_ID_PARAM = '26452364723';

describe('home page tests', () => {
	test('disable start meet when click without form values', async () => {
		useRouter.mockImplementation(() => ({
			query: {}
		}));

		render(<TestComponent />);

		const user = userEvent.setup();
		const startMeetButton = screen.getByTestId('startMeetButton');

		await user.click(startMeetButton);
		expect(startMeetButton).toBeDisabled();
	});

	test('disable start meet with invalid form values', async () => {
		useRouter.mockImplementation(() => ({
			query: {}
		}));

		render(<TestComponent />);

		const startMeetButton = screen.getByTestId('startMeetButton');		
		const user = userEvent.setup();

		await user.type(formInputs.userName(), ' ');
		await user.type(formInputs.userEmail(), 'valid@gmail.com');
		await user.type(formInputs.meetName(), 'Valid meet name');
		
		expect(startMeetButton).toBeDisabled();
	});

	test('enable start meet with valid form values', async () => {
		useRouter.mockImplementation(() => ({
			query: {}
		}));

		render(<TestComponent />);

		const startMeetButton = screen.getByTestId('startMeetButton');		
		const user = userEvent.setup();

		await user.type(formInputs.userName(), 'Valid user name');
		await user.type(formInputs.userEmail(), 'valid@gmail.com');
		await user.type(formInputs.meetName(), 'Valid meet name');
		
		expect(startMeetButton).not.toBeDisabled();
	});

	test('join meet modal appears with "meetId" query param', () => {
		useRouter.mockImplementation(() => ({
			query: { meetId: DEFAULT_MEET_ID_PARAM }
		}));

		render(<TestComponent />);
		
		const joinMeetModal = screen.getByTestId('joinMeetModal');
		expect(joinMeetModal).toHaveStyle('visibility: visible');
	});

	test('auto fill join meet modal meet id with "meetId" query param', () => {
		useRouter.mockImplementation(() => ({
			query: { meetId: DEFAULT_MEET_ID_PARAM }
		}));

		render(<TestComponent />);
		expect(formInputs.meetId()).toHaveValue(DEFAULT_MEET_ID_PARAM);
	});
});
