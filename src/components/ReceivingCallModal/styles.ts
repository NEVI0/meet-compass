import { darken } from 'polished';
import styled, { css } from 'styled-components';

type TReceivingCallModal = { 
	visible: boolean;
}

export const ReceivingCallModal = styled.div<TReceivingCallModal>`
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

	.receivingcall {
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

		&__content {
			display: flex;
			align-items: center;
			column-gap: .75rem;
		}

		&__button {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			column-gap: 1.25rem;
			padding: 0 2rem;
			height: 56px;
			border-radius: .75rem;
			font-weight: ${props => props.theme.font.medium};
			color: ${props => props.theme.colors.text};
			transition: .3s;

			&-default {
				background-color: ${props => props.theme.colors.red};
				
				&:hover, &:focus {
					background-color: ${props => darken(.2, props.theme.colors.red)};
				}
			}

			&-primary {
				background-color: ${props => props.theme.colors.primary};
				
				&:hover:not(&:disabled),
				&:focus:not(&:disabled) {
					background-color: ${props => props.theme.colors.secondary};
				}

				&:disabled {
					color: ${props => props.theme.colors.textLight};
					background-color: ${props => props.theme.colors.secondary};
				}
			}

			&:active {
				transform: scale(0.98);
			}

			&:disabled {
				cursor: no-drop;
			}
		}
	}
`;
