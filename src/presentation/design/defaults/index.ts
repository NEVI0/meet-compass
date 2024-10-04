import { createGlobalStyle } from 'styled-components';

export const DefaultStyles = createGlobalStyle`
	:root {
		--toastify-toast-width: 490px;
		--toastify-color-dark: ${props => props.theme.colors.toast.bg};
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html {
		scroll-behavior: smooth;

		@media (max-width: 475px) {
			font-size: 90%;
		}
	}

	body,
	input,
	button,
	textarea {
		font-smooth: always;
		-webkit-font-smoothing: antialiased;

		font-size: ${props => props.theme.typography.size.normal};
		font-family: ${props => props.theme.typography.font.family};
	}

	body {
		color: ${props => props.theme.colors.text.main};
		background-color: ${props => props.theme.colors.body};
	}

	button {
		cursor: pointer;
		border: none;
		outline: none;

		-webkit-tap-highlight-color: transparent;
	}

	h1, h2, h3 {
		color: ${props => props.theme.colors.text.main};
		font-weight: ${props => props.theme.typography.weight.semiBold};
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
