import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	:root {
		--toastify-toast-width: 490px;
	}

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	html {
		scroll-behavior: smooth;

		@media(max-width: 475px) {
			font-size: 90%;
		}
	}

	body,
	button,
	input,
	textarea {
		font-family: ${props => props.theme.font.family};
		font-size: ${props => props.theme.font.normalSize};
		-webkit-font-smoothing: antialiased;
		font-smooth: always;
	}

	body {
		background-color: ${props => props.theme.colors.body};
		color: ${props => props.theme.colors.text};
		transition: .3s; /*For animation dark mode*/
	}

	button {
		cursor: pointer;
		border: none;
		outline: none;
	}

	h1, h2, h3 {
		color: ${props => props.theme.colors.text};
		font-weight: ${props => props.theme.font.semiBold};
	}

	ul {
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type=number] {
		-moz-appearance: textfield;
	}
`;
