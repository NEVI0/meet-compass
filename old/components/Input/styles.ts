import styled, { css } from 'styled-components';

type TInput = {
	disabled?: boolean;
	hasError?: boolean;
}

export const Input = styled.div<TInput>`
	display: flex;
	flex-direction: column;
	row-gap: .25rem;

	.input {
		display: flex;
		align-items: center;
		column-gap: 1.25rem;
		border: 1px solid ${props => props.theme.colors.body};
		background-color: ${props => props.theme.colors.body};
		padding: 0 1.25rem;
		height: 48px;
		border-radius: 1rem;
		transition: .3s;

		&__icon {
			color: ${props => props.disabled ? props.theme.colors.textLight : props.theme.colors.primary};
			font-size: ${props => props.theme.font.iconSize};
			transition: .3s;
		}

		&__field {
			flex: 1;
			height: 100%;
			background-color: transparent;
			border: none;
			outline: none;
			color: ${props => props.disabled ? props.theme.colors.textLight : props.theme.colors.text};
		}

		${props => props.hasError && css`
			border-color: ${props.theme.colors.red};

			&__icon {
				color: ${props.theme.colors.red};
			}
		`};
	}

	.error {
		margin-left: 1.35rem;
		font-size: ${props => props.theme.font.smallerSize};
		color: ${props => props.theme.colors.red};
		transition: .3s;
	}

	@media screen and (min-width: 767px) {
		.input {
			height: 52px;
		}
	}
`;
