import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
	defaults: {
		headerHeight: '60px',
		footerHeight: '80px',
		fixed: 5
	},
	font: {
		family: 'Inter, sans-serif',

		h1Size: '1.5rem',       //24px
		h2Size: '1.25rem',      //20px
		h3Size: '1rem',         //16px

		biggestSize: '2rem',    //32px
		bigSize: '1.25rem',     //24px
		mediumSize: '1.125rem', //20px
		normalSize: '1rem',     //16px
		smallSize: '.875rem',   //14px
		smallerSize: '.75rem',  //12px
		iconSize: '1.25rem',
		
		semiBold: '600',
		medium: '500',
		regular: '400',
		light: '300',
		extraLight: '200'
	},
	colors: {
		primary: '#5926f2',
		secondary: '#381996',
		text: '#FFF',
		textLight: '#b4b4ba',
		body: '#08080c',
		container: '#111114',
		red: '#e22b2b',
		green: '#1e9228'
	}
}
