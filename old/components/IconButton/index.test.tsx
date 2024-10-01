import IconButton from '.';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test/defaultSetup';

import { hasKeyWordInWarning } from '../../utils/functions';

const DEFAULT_TEST_ID = 'iconButtonTestId';

describe('icon button component tests', () => {
	const user = userEvent.setup();
	const onClickFunction = jest.fn();
	const originalWarn = console.warn.bind(console.warn);

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWordInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('expect to render icon button', () => {
		render(
			<IconButton
				testId={ DEFAULT_TEST_ID }
				icon="Icon"
				onClick={ onClickFunction }
			/>
		);

		const iconButton = screen.getByTestId(DEFAULT_TEST_ID);
		expect(iconButton).toBeInTheDocument();
	});

	test('expect to render icon button without test id', () => {
		const text = 'Icon';

		render(
			<IconButton
				icon={ text }
				onClick={ onClickFunction }
			/>
		);

		const iconText = screen.queryByText(text);
		expect(iconText).toBeInTheDocument();
	});

	test('expect to call on click function', async () => {
		render(
			<IconButton
				testId={ DEFAULT_TEST_ID }
				icon="Icon"
				onClick={ onClickFunction }
			/>
		);

		const iconButton = screen.getByTestId(DEFAULT_TEST_ID);
		await user.click(iconButton);

		expect(onClickFunction).toHaveBeenCalled();
	});
});
