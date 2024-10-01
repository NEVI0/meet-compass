import Input from '.';

import { render, screen } from '../../test/defaultSetup';

import { hasKeyWordInWarning } from '../../utils/functions';
import { theme } from '../../styles/theme';

const DEFAULT_TEST_ID = 'inputTestId';

describe('input component tests', () => {
	const originalWarn = console.warn.bind(console.warn);

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWordInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('expect to render input', () => {
		render(
			<Input
				testId={ DEFAULT_TEST_ID }
				name="inputName"
				placeholder="Placeholder"
				icon="icon"
				value="Initial value"
				onChangeValue={ () => null }
			/>
		);

		const input = screen.getByTestId(DEFAULT_TEST_ID);
		expect(input).toBeInTheDocument();
	});

	test('expect to render input without test id', () => {
		const inputValue = 'Input value';

		render(
			<Input
				name="inputName"
				placeholder="Placeholder"
				icon="icon"
				value={ inputValue }
				onChangeValue={ () => null }
			/>
		);

		const input = screen.queryByDisplayValue(inputValue);
		expect(input).toBeInTheDocument();
	});

	test('expect to render input with error', () => {
		const errorValue = 'My error goes here!';

		render(
			<Input
				name="inputName"
				placeholder="Placeholder"
				icon="icon"
				error={ errorValue }
				value="Initial value"
				onChangeValue={ () => null }
			/>
		);

		const errorMessage = screen.queryByText(errorValue);
		expect(errorMessage).toBeInTheDocument();
	});

	test('expect input with error to be in red', () => {
		const errorValue = 'My error goes here!';

		render(
			<Input
				name="inputName"
				placeholder="Placeholder"
				icon="icon"
				error={ errorValue }
				value="Initial value"
				onChangeValue={ () => null }
			/>
		);

		const errorMessage = screen.queryByText(errorValue);
		expect(errorMessage).toHaveStyle(`color: ${theme.colors.red}`);
	});
});
