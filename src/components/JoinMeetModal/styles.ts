import styled, { css } from 'styled-components';

export const JoinMeetModal = styled.div<{ visible: boolean; }>`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.25);
	transition: .3s;
	visibility: hidden;
	opacity: 0;
	z-index: 5;

	${props => props.visible && css`
		visibility: visible;
		opacity: 1;
	`};

	.joinmeet {
		display: flex;
		flex-direction: column;
		row-gap: 1.5rem;
		padding: 1.5rem;
		background-color: ${props => props.theme.colors.container};
		box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
		border-radius: 1rem;
		transition: .3s;
		width: 450px;

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&__title {
			font-size: ${props => props.theme.font.h2Size};
		}

		&__close {
			width: 30px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: .5rem;
			background-color: ${props => props.theme.colors.body};
			color: ${props => props.theme.colors.container};
			font-size: ${props => props.theme.font.iconSize};
			color: ${props => props.theme.colors.text};
		}

		&__input-row {
			display: flex;
			align-items: center;
			column-gap: 1.5rem;

			.input {
				flex: 1;
				display: flex;
				align-items: center;
				column-gap: 1.25rem;
				background-color: ${props => props.theme.colors.body};
				padding: 1rem 1.25rem;
				border-radius: 1rem;

				&__icon {
					color: ${props => props.theme.colors.primary};
					font-size: ${props => props.theme.font.iconSize};
				}

				&__field {
					flex: 1;
					background-color: transparent;
					border: none;
					outline: none;
					color: ${props => props.theme.colors.text};
				}
			}
		}

		&__button {
			display: flex;
			align-items: center;
			justify-content: center;
			column-gap: .5rem;
			transition: .3s;
			color: ${props => props.theme.colors.text};
			background-color: transparent;
			cursor: pointer;

			&:hover, &:focus {
				color: ${props => props.theme.colors.primary};
			}

			&:disabled {
				cursor: no-drop;
				color: ${props => props.theme.colors.textLight};
			}
		}

		&__error {
			color: ${props => props.theme.colors.red};
			font-size: ${props => props.theme.font.smallSize};
			font-weight: 500;
			text-align: center;
		}
	}
`;
