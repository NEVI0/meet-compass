import styled from 'styled-components';

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 52px;
	padding: 0 2rem;
	border-radius: 1rem;
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.text};
	font-weight: ${props => props.theme.font.medium};
	transition: .3s;
	
	&:hover, &:focus {
		background-color: ${props => props.theme.colors.secondary};
		color: #FFF;
	}

	&:active:not(&:disabled) {
		transform: scale(0.98);
	}

	&:disabled {
		color: ${props => props.theme.colors.textLight};
		background-color: ${props => props.theme.colors.body};
		cursor: no-drop;
	}
`;
