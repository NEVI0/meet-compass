import styled from 'styled-components';

export const NotFoundContainer = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.notfound {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 3.25rem;
		text-align: center;

		&__title {
			font-size: ${props => props.theme.font.h1Size};
			margin-bottom: .25rem;
		}

		&__message {
			color: ${props => props.theme.colors.textLight};
		}
	}
`;
