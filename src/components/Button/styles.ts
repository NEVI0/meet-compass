import styled from 'styled-components';

type TButton = {
	bgColor?: string;
	actionBgColor?: string;
}

export const Button = styled.button<TButton>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px;
	padding: 0 2rem;
	border-radius: 1rem;
	background-color: ${props => props.bgColor};
	font-weight: ${props => props.theme.font.medium};
	color: ${props => props.theme.colors.text};
	transition: .3s;
	
	&:hover, &:focus {
		background-color: ${props => props.actionBgColor};
	}

	&:active:not(&:disabled) {
		transform: scale(0.98);
	}

	&:disabled {
		color: ${props => props.theme.colors.textLight};
		background-color: ${props => props.theme.colors.body};
		cursor: no-drop;
	}

	@media screen and (min-width: 767px) {
		height: 52px;
	}
`;
