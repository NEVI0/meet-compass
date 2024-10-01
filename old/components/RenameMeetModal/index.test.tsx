import RenameMeetModal from '.';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/defaultSetup';

import { hasKeyWordInWarning } from '../../utils/functions';

describe('rename meet modal component tests', () => {
	const user = userEvent.setup();
	const originalWarn = console.warn.bind(console.warn);
	const onCloseFunction = jest.fn();

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWordInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('expect to render rename meet modal', () => {
		render(<RenameMeetModal visible={ true } onClose={ onCloseFunction } />);

		const renameMeetModal = screen.getByTestId('renameMeetModal');
		expect(renameMeetModal).toBeInTheDocument();
	});

	test('expect to not show rename meet modal', () => {
		render(<RenameMeetModal visible={ false } onClose={ onCloseFunction } />);

		const renameMeetModal = screen.getByTestId('renameMeetModal');
		expect(renameMeetModal).toHaveStyle('visibility: hidden');
	});

	test('expect to close rename meet modal when click close button', async () => {
		render(<RenameMeetModal visible={ true } onClose={ onCloseFunction } />);

		const closeRenameMeetModalButton = screen.getByTestId('closeRenameMeetModalButton');
		await user.click(closeRenameMeetModalButton);

		expect(onCloseFunction).toHaveBeenCalled();
	});
});
