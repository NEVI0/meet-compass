import React from 'react';

import ReceivingCallModal from '.';
import { MeetProvider, MeetContextProps } from '../../contexts/MeetContext';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/defaultSetup';

import { hasKeyWordInWarning } from '../../utils/functions';

interface MockReceivingCallModalProps {
	visible: boolean;
	testData?: any;
}

describe('receiving call modal component tests', () => {
	const user = userEvent.setup();
	const originalWarn = console.warn.bind(console.warn);

	const mockMeetContextData = {
		otherUserData: {
			id: '123',
			name: 'User',
			email: 'user@gmail.com'
		}
	} as MeetContextProps;

	const MockReceivingCallModal: React.FC<MockReceivingCallModalProps> = ({ visible, testData }) => (
		<MeetProvider testData={ testData }>
			<ReceivingCallModal visible={ visible } />
		</MeetProvider>
	);

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWordInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('expect to render receiving call modal', () => {
		render(<MockReceivingCallModal visible={ true } testData={ mockMeetContextData } />);

		const receivingCallModal = screen.getByTestId('receivingCallModal');
		expect(receivingCallModal).toBeInTheDocument();
	});

	test('expect to not show receiving call modal', () => {
		render(<MockReceivingCallModal visible={ false } testData={ mockMeetContextData } />);

		const receivingCallModal = screen.getByTestId('receivingCallModal');
		expect(receivingCallModal).toHaveStyle('visibility: hidden');
	});

	test('expect to reject meet request', async () => {
		const rejectFunction = jest.fn();
		const meetData = {
			...mockMeetContextData,
			rejectMeetRequest: rejectFunction
		} as MeetContextProps;

		render(<MockReceivingCallModal visible={ false } testData={ meetData } />);

		const rejectMeetRequestButton = screen.getByTestId('rejectMeetRequestButton');
		await user.click(rejectMeetRequestButton);

		expect(rejectFunction).toHaveBeenCalled();
	});

	test('expect to accept meet request', async () => {
		const acceptFunction = jest.fn();
		const meetData = {
			...mockMeetContextData,
			acceptMeetRequest: acceptFunction
		} as MeetContextProps;

		render(<MockReceivingCallModal visible={ false } testData={ meetData } />);

		const acceptMeetRequestButton = screen.getByTestId('acceptMeetRequestButton');
		await user.click(acceptMeetRequestButton);

		expect(acceptFunction).toHaveBeenCalled();
	});
});
