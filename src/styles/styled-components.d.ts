import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		font: {
			family: string;

			h1Size: string;
			h2Size: string;
			h3Size: string;

			biggestSize: string;
			bigSize: string;
			mediumSize: string;
			normalSize: string;
			smallSize: string;
			smallerSize: string;
			iconSize: string;
			
			semiBold: string;
			medium: string;
			regular: string;
			light: string;
			extraLight: string;
		};
		colors: {
			primary: string;
			secondary: string;
			text: string;
			textLight: string;
			body: string;
			container: string;
			red: string;
		};
	}
}
