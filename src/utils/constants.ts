import { ToastOptions } from 'react-toastify';
import { theme } from '../styles/theme';

export const PEER_CONFIGS = {		  
	iceServers: [
		{
			urls: 'stun:openrelay.metered.ca:80',
		},
		{
			urls: 'turn:openrelay.metered.ca:80',
			username: 'openrelayproject',
			credential: 'openrelayproject',
		},
		{
			urls: 'turn:openrelay.metered.ca:443',
			username: 'openrelayproject',
			credential: 'openrelayproject',
		},
		{
			urls: 'turn:openrelay.metered.ca:443?transport=tcp',
			username: 'openrelayproject',
			credential: 'openrelayproject',
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
