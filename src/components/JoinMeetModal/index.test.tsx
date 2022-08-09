import React from 'react';

import JoinMeetModal from '.';
import { MeetProvider, MeetContextProps } from '../../contexts/MeetContext';

import userEvent from '@testing-library/user-event';
import { render, screen, act } from '../../test/defaultSetup';

import { hasKeyWordInWarning } from '../../utils/functions';

interface MockJoinMeetModalProps {
	visible: boolean;
	defaultMeetId?: string;
	onClose: () => void;
	testData?: any;
}

describe('join meet modal component tests', () => {
	const user = userEvent.setup();
	const originalWarn = console.warn.bind(console.warn);
	const onCloseFunction = jest.fn();
	const visibleStyle = 'visibility: visible';
	const notVisibleStyle = 'visibility: hidden';

	const MockJoinMeetModal: React.FC<MockJoinMeetModalProps> = ({ visible, defaultMeetId, onClose, testData }) => (
		<MeetProvider testData={ testData }>
			<JoinMeetModal visible={ visible } defaultMeetId={ defaultMeetId } onClose={ onClose } />
		</MeetProvider>
	);

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWordInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('expect to render join meet modal', () => {
		render(<MockJoinMeetModal visible={ true } onClose={ onCloseFunction } />);

		const joinMeetModal = screen.getByTestId('joinMeetModal');
		expect(joinMeetModal).toHaveStyle(visibleStyle);
	});

	test('expect to not render join meet modal', () => {
		render(<MockJoinMeetModal visible={ false } onClose={ onCloseFunction } />);

		const joinMeetModal = screen.getByTestId('joinMeetModal');
		expect(joinMeetModal).toHaveStyle(notVisibleStyle);
	});

	test('expect to render join meet modal with meet id input filled', async () => {
		const defaultMeetId = 'asgd8276dgvas';
		
		await act(async () => {
			await render(
				<MockJoinMeetModal
					visible={ true }
					defaultMeetId={ defaultMeetId }
					onClose={ onCloseFunction }
				/>
			);
		});

		const meetIdInput = screen.getByTestId('meetIdInput');
		expect(meetIdInput).toHaveValue(defaultMeetId);
	});

	test('expect to enable form button with valid input values', async () => {
		render(<MockJoinMeetModal visible={ true } onClose={ onCloseFunction } />);

		const userNameInput = screen.getByTestId('userNameInput');
		const userEmailInput = screen.getByTestId('userEmailInput');
		const meetIdInput = screen.getByTestId('meetIdInput');

		await user.type(userNameInput, 'User Name');
		await user.type(userEmailInput, 'user@gmail.com');
		await user.type(meetIdInput, '434gfsgfd');

		const joinMeetButton = screen.getByTestId('joinMeetButton');
		expect(joinMeetButton).not.toBeDisabled();
	});

	test('expect to disable form button with invalid input values', async () => {
		render(<MockJoinMeetModal visible={ true } onClose={ onCloseFunction } />);

		const userNameInput = screen.getByTestId('userNameInput');
		await user.type(userNameInput, 'Ue');

		const joinMeetButton = screen.getByTestId('joinMeetButton');
		expect(joinMeetButton).toBeDisabled();
	});

	test('expect to join meet with valid input values', async () => {
		const mockJoinMeet = jest.fn();
		const mockMeetData = {
			joinMeet(userName: string, userEmail: string, userToCallId: string) {
				mockJoinMeet();
			}
		} as MeetContextProps;
		render(<MockJoinMeetModal visible={ true } onClose={ onCloseFunction } testData={ mockMeetData } />);

		const userNameInput = screen.getByTestId('userNameInput');
		const userEmailInput = screen.getByTestId('userEmailInput');
		const meetIdInput = screen.getByTestId('meetIdInput');

		await user.type(userNameInput, 'User Name');
		await user.type(userEmailInput, 'user@gmail.com');
		await user.type(meetIdInput, '434gfsgfd');

		const joinMeetButton = screen.getByTestId('joinMeetButton');
		await user.click(joinMeetButton);

		expect(mockJoinMeet).toHaveBeenCalled();
	});
});
