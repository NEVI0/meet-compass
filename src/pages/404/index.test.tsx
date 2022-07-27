import NotFound, { NOT_FOUND_SECONDS_TO_REDIRECT } from './index.page';
import { render } from '../../test/defaultSetup';

import { hasKeyWorkInWarning } from '../../utils/functions';

describe('not found page tests', () => {
	jest.setTimeout(10000);

	const originalWarn = console.warn.bind(console.warn);
	const useRouter = jest.spyOn(require('next/router'), 'useRouter');

	beforeAll(() => {
		console.warn = (message: string) => !hasKeyWorkInWarning(message) && originalWarn(message);
	});

	afterAll(() => {
		console.warn = originalWarn;
	});

	test('redirect user after 5 seconds', async () => {
		const redirectionFunction = jest.fn();

		useRouter.mockImplementation(() => ({
			route: '/invalid-path',
			pathname: '/invalid-path',
			replace: redirectionFunction
		}));

		render(<NotFound />);

		await new Promise((resolve) => setTimeout(resolve, NOT_FOUND_SECONDS_TO_REDIRECT));
		expect(redirectionFunction).toHaveBeenCalledWith('/home');
	});
});
