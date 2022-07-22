import React from 'react';

import Meet from './index.page';
import { MeetProvider, MeetContextProps } from '../../contexts/MeetContext';

import { render, screen } from '../../test/defaultSetup';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const MockMeet: React.FC<{ testData?: any }> = ({ testData }) => (
	<MeetProvider testData={ testData }>
		<Meet />
	</MeetProvider>
);

describe('meet page tests', () => {
	const redirectionFunction = jest.fn();

	beforeAll(() => {
		useRouter.mockImplementation(() => ({
			replace: redirectionFunction
		}));
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
});
