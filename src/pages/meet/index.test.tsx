import React from 'react';

import Meet from './index.page';
import { MeetProvider, MeetContextProps } from '../../contexts/MeetContext';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/defaultSetup';

import { hasKeyWorkInWarning } from '../../utils/functions';

describe('meet page tests', () => {
	const user = userEvent.setup();
	const redirectionFunction = jest.fn();
	const originalWarn = console.warn.bind(console.warn);
	const useRouter = jest.spyOn(require('next/router'), 'useRouter');
	
	const MockMeet: React.FC<{ testData?: any }> = ({ testData }) => (
		<MeetProvider testData={ testData }>
			<Meet />
		</MeetProvider>
	);

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWorkInWarning(message) && originalWarn(message);

		useRouter.mockImplementation(() => ({
			replace: redirectionFunction
		}));
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('redirect to home when there is no user data', () => {
		render(<MockMeet />);
		expect(redirectionFunction).toHaveBeenCalled();
	});

	test('check user name in screen', () => {
		const mockMeetData = {
			userData: {
				id: '123',
				name: 'User Name',
				email: 'user@gmail.com'
			}
		} as MeetContextProps;
		
		render(<MockMeet testData={ mockMeetData } />);

		const userName = screen.getByText('User Name');
		expect(userName).toBeInTheDocument();
	});

	test('open menu by header', async () => {
		render(<MockMeet />);

		const headerOpenMenuButton = screen.getByTestId('headerOpenMenuButton');	
		await user.click(headerOpenMenuButton);

		const menu = screen.getByTestId('menu');
		expect(menu).toHaveStyle('visibility: visible');
	});

	test('open menu by footer', async () => {
		render(<MockMeet />);

		const footerOpenMenuButton = screen.getByTestId('footerOpenMenuButton');	
		await user.click(footerOpenMenuButton);

		const menu = screen.getByTestId('menu');
		expect(menu).toHaveStyle('visibility: visible');
	});

	test('open chat', async () => {
		const mockMeetData = {
			otherUserData: {
				id: '123',
				name: 'User Name',
				email: 'user@gmail.com'
			}
		} as MeetContextProps;

		render(<MockMeet testData={ mockMeetData } />);

		const openChatButton = screen.getByTestId('openChatButton');	
		await user.click(openChatButton);

		const chat = screen.getByTestId('chat');
		expect(chat).toHaveStyle('visibility: visible');
	});
});
