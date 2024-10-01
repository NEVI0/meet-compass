import styled from 'styled-components';

export const IconButton = styled.button`
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: .5rem;
	background-color: ${props => props.theme.colors.body};
	font-size: ${props => props.theme.font.iconSize};
	color: ${props => props.theme.colors.text};
`;
