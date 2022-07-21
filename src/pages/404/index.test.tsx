import NotFound, { NOT_FOUND_SECONDS_TO_REDIRECT } from './index.page';
import { render } from '../../test/defaultSetup';

jest.setTimeout(10000);
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('not found page tests', () => {
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
