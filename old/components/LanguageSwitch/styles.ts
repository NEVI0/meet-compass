import styled from 'styled-components';

export const LanguageSwitch = styled.button`
	display: flex;
	align-items: center;
	column-gap: .25rem;
	padding: .25rem;
	border-radius: 50px;
	background-color: ${props => props.theme.colors.primary};
	transition: .3s;

	.language__icon {
		width: 20px;
	}

	.language__initials {
		text-transform: uppercase;
		color: ${props => props.theme.colors.text};
		font-size: ${props => props.theme.font.smallSize};
		font-weight: 500;
	}

	&:hover, &:focus {
		background-color: ${props => props.theme.colors.secondary};
	}	
`;
