import Home from './index.page';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/defaultSetup';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const formInputs = {
	userName: () => screen.getByTestId('userNameInput'),
	userEmail: () => screen.getByTestId('userEmailInput'),
	meetName: () => screen.getByTestId('meetNameInput'),
	meetId: () => screen.getByTestId('meetIdInput')
}

const DEFAULT_MEET_ID_PARAM = '26452364723';

describe('home page tests', () => {
	test('disable start meet when click without form values', async () => {
		useRouter.mockImplementation(() => ({
			query: {}
		}));

		render(<Home />);

		const user = userEvent.setup();
		const startMeetButton = screen.getByTestId('startMeetButton');

		await user.click(startMeetButton);
		expect(startMeetButton).toBeDisabled();
	});

	test('disable start meet with invalid form values', async () => {
		useRouter.mockImplementation(() => ({
			query: {}
		}));

		render(<Home />);

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

		render(<Home />);

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

		render(<Home />);
		
		const joinMeetModal = screen.getByTestId('joinMeetModal');
		expect(joinMeetModal).toHaveStyle('visibility: visible');
	});

	test('auto fill join meet modal meet id with "meetId" query param', () => {
		useRouter.mockImplementation(() => ({
			query: { meetId: DEFAULT_MEET_ID_PARAM }
		}));

		render(<Home />);
		expect(formInputs.meetId()).toHaveValue(DEFAULT_MEET_ID_PARAM);
	});

	test('open join meet modal when click in "clicking here" link', async () => {
		useRouter.mockImplementation(() => ({
			query: {}
		}));

		render(<Home />);

		const joinMeetLink = screen.getByTestId('joinMeetLink');
		await userEvent.click(joinMeetLink);

		const joinMeetModal = screen.getByTestId('joinMeetModal');
		expect(joinMeetModal).toHaveStyle('visibility: visible');
	});
});
