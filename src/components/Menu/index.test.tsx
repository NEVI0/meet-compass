import React from 'react';

import Menu from '.';
import { MeetProvider, MeetContextProps } from '../../contexts/MeetContext';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/defaultSetup';

import { hasKeyWorkInWarning } from '../../utils/functions';

interface MockMenuProps {
	visible: boolean;
	onClose: () => void;
	testData?: any;
	children: any;
}

describe('menu component tests', () => {
	const user = userEvent.setup();
	const originalWarn = console.warn.bind(console.warn);
	const onCloseFunction = jest.fn();
	const visibleStyle = 'right: 0';
	const notVisibleStyle = 'right: -100%';

	const MockMenu: React.FC<MockMenuProps> = ({ visible, onClose, testData, children }) => (
		<MeetProvider testData={ testData }>
			<Menu visible={ visible } onClose={ onClose }>
				{ children }
			</Menu>
		</MeetProvider>
	);

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWorkInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('expect menu to be visible', () => {
		render(<MockMenu visible={ true } onClose={ onCloseFunction }>Children</MockMenu>);

		const menu = screen.getByTestId('menu');
		expect(menu).toHaveStyle(visibleStyle);
	});

	test('expect menu to not be visible', () => {
		render(<MockMenu visible={ false } onClose={ onCloseFunction }>Children</MockMenu>);

		const menu = screen.getByTestId('menu');
		expect(menu).toHaveStyle(notVisibleStyle);
	});

	test('expect user data in menu header', () => {
		const mockUserName = 'User name';
		const mockUserEmail = 'user@gmail.com';
		const mockMeetData = {
			userData: {
				id: '123',
				name: mockUserName,
				email: mockUserEmail
			}
		} as MeetContextProps;

		render(
			<MockMenu visible={ true } onClose={ onCloseFunction } testData={ mockMeetData }>
				Children
			</MockMenu>
		);

		const userName = screen.queryByText(mockUserName);
		const userEmail = screen.queryByText(mockUserEmail);

		expect(userName).toBeInTheDocument();
		expect(userEmail).toBeInTheDocument();
	});

	test('expect to close menu when click in close button', async () => {
		render(<MockMenu visible={ true } onClose={ onCloseFunction }>Children</MockMenu>);

		const closeMenuButton = screen.getByTestId('closeMenuButton');
		await user.click(closeMenuButton);

		expect(onCloseFunction).toHaveBeenCalled();
	});

	test('expect to render children properly', async () => {
		const childrenText = 'Expected children in menu';

		render(
			<MockMenu visible={ true } onClose={ onCloseFunction }>
				<p>{ childrenText }</p>
			</MockMenu>
		);

		const children = screen.queryByText(childrenText);
		expect(children).toBeInTheDocument();
	});
});
