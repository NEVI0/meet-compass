import styled from 'styled-components';

export const Input = styled.div<{ disabled?: boolean; }>`
	display: flex;
	align-items: center;
	column-gap: 1.25rem;
	background-color: ${props => props.theme.colors.body};
	padding: 0 1.25rem;
	height: 48px;
	border-radius: 1rem;
	transition: .3s;

	.input__icon {
		color: ${props => props.disabled ? props.theme.colors.textLight : props.theme.colors.primary};
		font-size: ${props => props.theme.font.iconSize};
		transition: .3s;
	}

	.input__field {
		flex: 1;
		background-color: transparent;
		border: none;
		outline: none;
		color: ${props => props.disabled ? props.theme.colors.textLight : props.theme.colors.text};
		transition: .3s;
	}

	@media screen and (min-width: 767px) {
		height: 52px;
	}
`;
