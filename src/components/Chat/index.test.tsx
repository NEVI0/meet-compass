import React from 'react';

import Chat from '.';
import { MeetProvider, MeetContextProps } from '../../contexts/MeetContext';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/defaultSetup';

import { hasKeyWorkInWarning } from '../../utils/functions';

interface MockChatProps {
	visible: boolean;
	onClose: () => void;
	testData?: any;
}

describe('chat component tests', () => {
	const user = userEvent.setup();
	const originalWarn = console.warn.bind(console.warn);
	const onCloseFunction = jest.fn();
	const visibleStyle = 'right: 0';
	const notVisibleStyle = 'right: -100%';

	const MockChat: React.FC<MockChatProps> = ({ visible, onClose, testData }) => (
		<MeetProvider testData={ testData }>
			<Chat visible={ visible } onClose={ onClose } />
		</MeetProvider>
	);

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWorkInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('expect chat to be visible', () => {
		render(<MockChat visible={ true } onClose={ onCloseFunction } />);

		const chat = screen.getByTestId('chat');
		expect(chat).toHaveStyle(visibleStyle);
	});

	test('expect chat to not be visible', () => {
		render(<MockChat visible={ false } onClose={ onCloseFunction } />);

		const chat = screen.getByTestId('chat');
		expect(chat).toHaveStyle(notVisibleStyle);
	});

	test('send message to other user', async () => {
		const mockMeetData = {
			socketRef: {
				current: {
					on: () => jest.fn(),
					off: () => jest.fn(),
					emit: () => jest.fn(),
				}
			},
			otherUserData: {
				id: '123',
				name: 'User Name',
				email: 'user@gmail.com'
			}
		} as MeetContextProps;

		render(<MockChat visible={ true } onClose={ onCloseFunction } testData={ mockMeetData } />);

		const sendMessageFunction = jest.fn();
		const sendChatMessage = screen.getByTestId('sendChatMessage');
		sendChatMessage.addEventListener('click', sendMessageFunction);

		await user.click(sendChatMessage);

		expect(sendMessageFunction).toHaveBeenCalled();
	});

	test('expect sent message to be in the chat', async () => {
		const mockMeetData = {
			socketRef: {
				current: {
					on: () => jest.fn(),
					off: () => jest.fn(),
					emit: () => jest.fn(),
				}
			},
			otherUserData: {
				id: '123',
				name: 'User Name',
				email: 'user@gmail.com'
			}
		} as MeetContextProps;

		render(<MockChat visible={ true } onClose={ onCloseFunction } testData={ mockMeetData } />);

		const sendChatMessage = screen.getByTestId('sendChatMessage');
		sendChatMessage.addEventListener('click', jest.fn);

		const messageToSend = 'This is my message sent!';
		const chatMessage = screen.getByTestId('chatMessage');

		await user.type(chatMessage, messageToSend);
		await user.click(sendChatMessage);
		
		const sentMessageText = screen.queryByText(messageToSend);
		expect(sentMessageText).toBeInTheDocument();
	});
});
