import React, { useRef, useState, useEffect, useContext, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';
import i18n from '../i18n';

import { PEER_CONFIGS, TOAST_DEFAULT_CONFIG } from '../utils/constants';
import { TCallAccepted, TRequestConnectionData, TUserLeft } from '../types/socket';
import { TUser } from '../types/user';
import { isEmpty } from '../utils/functions';

type TLanguage = 'en' | 'pt';

interface AppContextProps {
	socketRef: React.MutableRefObject<any>;
	userVideoRef: React.RefObject<HTMLVideoElement>;
	otherUserVideoRef: React.RefObject<HTMLVideoElement>;

	meetName: string;
	userData: TUser;
	otherUserData: TUser;
	selectedLanguage: TLanguage;
	
	userStream?: MediaStream;
	otherUserSignal?: SimplePeer.SignalData;

	isCallingUser: boolean;
	meetRequestAccepted: boolean;
	isReceivingMeetRequest: boolean;

	changeSelectedLanguage: () => void;
	getUserStream: () => void;
	startNewMeet: (userName: string, userEmail: string, meetName: string) => void;
	meetOtherUser: (userName: string, userEmail: string, userToCallId: string) => void;
	acceptMeetRequest: () => void;
	rejectMeetRequest: () => void;
	removeOtherUserFromMeet: () => void;
	leftMeet: () => void;
}

const AppContext: React.Context<AppContextProps> = createContext({} as AppContextProps);

export const AppProvider: React.FC<{ children: any; }> = ({ children }) => {

	const router = useRouter();
	const { t } = useTranslation();
	
	const peerRef = useRef<any>(null);
	const socketRef = useRef<any>(null);
	const userVideoRef = useRef<HTMLVideoElement>(null);
	const otherUserVideoRef = useRef<HTMLVideoElement>(null);

	const [ meetName, setMeetName ] = useState<string>('');
	const [ userData, setUserData ] = useState<TUser>({} as TUser);
	const [ otherUserData, setOtherUserData ] = useState<TUser>({} as TUser);
	const [ selectedLanguage, setSelectedLanguage ] = useState<TLanguage>('en');
	
	const [ userStream, setUserStream ] = useState<MediaStream>();
  	const [ otherUserSignal, setOtherUserSignal ] = useState<SimplePeer.SignalData>();

	const [ isCallingUser, setIsCallingUser ] = useState<boolean>(false);
	const [ meetRequestAccepted, setMeetRequestAccepted ] = useState<boolean>(false);
	const [ isReceivingMeetRequest, setIsReceivingMeetRequest ] = useState<boolean>(false);

	const changeSelectedLanguage = () => {
		try {
			const languageToSet = selectedLanguage === 'en' ? 'pt' : 'en';
			localStorage.setItem('@MEET_COMPASS:language', languageToSet);
			setSelectedLanguage(languageToSet);
			i18n.changeLanguage(languageToSet);
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const resetMeetData = () => {
		setOtherUserData({} as TUser);
		setOtherUserSignal(undefined);

		setIsCallingUser(false);
		setMeetRequestAccepted(false);
		setIsReceivingMeetRequest(false);
	}

	const getUserStream = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); 
			if (userVideoRef.current) userVideoRef.current.srcObject = stream;

			setUserStream(stream);
			return stream;
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const startNewMeet = async (userName: string, userEmail: string, meet: string) => {
		try {
			const user = { id: socketRef.current.id, name: userName, email: userEmail };
			socketRef.current.emit('save-user-data', user);
			
			setUserData(user);
			setMeetName(meet);		

			router.push('/meet');
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const meetOtherUser = async (userName: string, userEmail: string, userToCallId: string) => {
		try {
			const stream = await getUserStream();
			setIsCallingUser(true);

			const peer = new SimplePeer({
				initiator: true,
				trickle: false,
				config: PEER_CONFIGS,
				stream: stream, 
			});

			const user = { id: socketRef.current.id, name: userName, email: userEmail };
			socketRef.current.emit('save-user-data', user);
			setUserData(user);

			peer.on('signal', data => {
				socketRef.current.emit('call-user', {
					to: userToCallId,
					from: user,
					signal: data,
				});
			})
		
			peer.on('stream', stream => { 
				if (otherUserVideoRef.current) otherUserVideoRef.current.srcObject = stream;
			});

			peerRef.current = peer;
			router.push('/meet');
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const acceptMeetRequest = async () => {
		try {
			setMeetRequestAccepted(true);
			setIsReceivingMeetRequest(false);

			const peer = new SimplePeer({
				initiator: false,
				trickle: false,
				stream: userStream
			});

			peer.on('signal', data => {
				socketRef.current.emit('accept-call', {
					from: userData,
					to: otherUserData.id,
					signal: data,
					meetName
				});
			});

			peer.on('stream', stream => { 
				if (otherUserVideoRef.current) otherUserVideoRef.current.srcObject = stream;
			});

			peerRef.current = peer;  // @ts-ignore
			peer.signal(otherUserSignal);
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const rejectMeetRequest = () => {
		socketRef.current.emit('reject-call', { to: otherUserData.id });
		resetMeetData();
	}

	const cancelMeetRequest = () => {
		socketRef.current.emit('reject-call', { to: otherUserData.id });
		resetMeetData();
	}

	const removeOtherUserFromMeet = () => {
		socketRef.current.emit('remove-user', { userToRemove: otherUserData });
		resetMeetData();
	}

	const leftMeet = () => {
		socketRef.current.emit('left-meet', { to: otherUserData.id });
		peerRef.current.destroy();

		resetMeetData();
		setMeetName('');

		router.push('/home');
	}

	useEffect(() => {
		const language = localStorage.getItem('@MEET_COMPASS:language'); // @ts-ignore
		setSelectedLanguage(language || 'en');
		i18n.changeLanguage(language || 'en');
	}, []);

	useEffect(() => {
		const handleSocketConnection = async () => {
			try {
				await fetch('/api/socket');
				socketRef.current = io();

				socketRef.current.on('request-connection', (data: TRequestConnectionData) => {
					setIsReceivingMeetRequest(true);
					setOtherUserData(data.from);
					setOtherUserSignal(data.signal);
				});

				socketRef.current.on('call-accepted', (data: TCallAccepted) => {
					setIsCallingUser(false);
					setMeetRequestAccepted(true);
					setMeetName(data.meetName);
					setOtherUserData(data.from);
	
					peerRef.current.signal(data.signal);
				});

				socketRef.current.on('call-rejected', () => {
					resetMeetData();
					peerRef.current.destroy();
					toast(t('page.meet.toast.requestDeclined'), TOAST_DEFAULT_CONFIG);
				});

				socketRef.current.on('user-left', (data: TUserLeft) => {
					const isOtherUserDisconnected = !otherUserSignal || isEmpty(otherUserData);
					if (isOtherUserDisconnected) return;

					toast(t('page.meet.toast.userLeft', { user: data.user.name }), TOAST_DEFAULT_CONFIG);
					resetMeetData();

					peerRef.current.destroy();
				});

				socketRef.current.on('removed-from-meet', () => {
					toast(t('page.meet.toast.userRemoved'), TOAST_DEFAULT_CONFIG);

					setMeetName('');
					peerRef.current.destroy();

					router.push('/home');
				});

				socketRef.current.on('other-user-left-meet', () => {
					toast(t('page.meet.toast.otherUserLeft', { user: otherUserData.name }), TOAST_DEFAULT_CONFIG);
					resetMeetData();
					setMeetName('');
					peerRef.current.destroy();
				});
			} catch (error) {
				console.log('Could not init socket connection! ', error);
			}
		}

		handleSocketConnection();
	}, []);

	return (
		<AppContext.Provider
			value={{
				socketRef,
				userVideoRef,
				otherUserVideoRef,

				meetName,
				userData,
				otherUserData,
				selectedLanguage,
				
				userStream,
				otherUserSignal,
				
				isCallingUser,
				meetRequestAccepted,
				isReceivingMeetRequest,
				
				changeSelectedLanguage,
				startNewMeet,
				getUserStream,
				meetOtherUser,
				acceptMeetRequest,
				rejectMeetRequest,
				removeOtherUserFromMeet,
				leftMeet
			}}
		>
			{ children }
		</AppContext.Provider>
	);

}

const useAppContext = () => useContext(AppContext);
export default useAppContext;
