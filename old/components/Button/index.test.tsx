import Button from '.';
import { render, screen } from '../../test/defaultSetup';

import { theme } from '../../styles/theme';

const DEFAULT_TEST_ID = 'buttonTestId';

describe('button component tests', () => {
	test('render primary button', () => {
		render(
			<Button testId={ DEFAULT_TEST_ID }>
				Primary Button
			</Button>
		);

		const button = screen.getByTestId(DEFAULT_TEST_ID);
		expect(button).toHaveStyle(`background-color: ${theme.colors.primary}`);
	});

	test('render red button', () => {
		render(
			<Button testId={ DEFAULT_TEST_ID } bgColor={ theme.colors.red }>
				Red Button
			</Button>
		);

		const button = screen.getByTestId(DEFAULT_TEST_ID);
		expect(button).toHaveStyle(`background-color: ${theme.colors.red}`);
	});

	test('render not default red button', () => {
		render(
			<Button testId={ DEFAULT_TEST_ID } bgColor="red">
				Red Button
			</Button>
		);

		const button = screen.getByTestId(DEFAULT_TEST_ID);
		expect(button).not.toHaveStyle(`background-color: ${theme.colors.red}`);
	});
});
