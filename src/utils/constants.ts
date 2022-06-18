import { ToastOptions } from 'react-toastify';
import { theme } from '../styles/theme';

export const PEER_CONFIGS = {		  
	iceServers: [
		{
			urls: 'stun:numb.viagenie.ca',
			username: 'sultan1640@gmail.com',
			credential: '98376683'
		},
		{
			urls: 'turn:numb.viagenie.ca',
			username: 'sultan1640@gmail.com',
			credential: '98376683'
		}
	]
}

export const TOAST_DEFAULT_CONFIG: ToastOptions = {
	theme: 'dark',
	bodyStyle: {
		fontFamily: theme.font.family,
		fontSize: theme.font.normalSize,
		fontWeight: 500,
		textAlign: 'center'
	},
	progressStyle: {
		backgroundColor: theme.colors.primary
	}
};

export const LOTTIE_OPTIONS = {
	loop: true,
	autoplay: true, 
	animationData: '',
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
}
