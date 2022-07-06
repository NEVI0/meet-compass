import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	:root {
		--toastify-toast-width: 490px;
		--toastify-color-dark: ${props => props.theme.colors.container};
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
	}

	button {
		cursor: pointer;
		border: none;
		outline: none;
		-webkit-tap-highlight-color: transparent;
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
		-webkit-tap-highlight-color: transparent;
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

	input:-webkit-autofill,
	input:-webkit-autofill:hover, 
	input:-webkit-autofill:focus, 
	input:-webkit-autofill:active{
		-webkit-box-shadow: 0 0 0px 1000px ${props => props.theme.colors.body} inset;
		-webkit-text-fill-color: ${props => props.theme.colors.text};
		transition: background-color 5000s ease-in-out 0s;
	}

	/* Firefox */
	input[type=number] {
		-moz-appearance: textfield;
	}

	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background: transparent;
	}
	::-webkit-scrollbar-thumb {
		background: #555;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #2d2d2d;
	}
`;

/*
Breakpoints

@media screen and (min-width: 576px) {}
@media screen and (min-width: 768px) {}
@media screen and (min-width: 992px) {}
@media screen and (min-width: 1200px) {}
*/
