import React, { useRef, useState, useEffect, useContext, createContext } from 'react';

import { useRouter } from 'next/router';

import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';
import i18n from '../i18n';

import { PEER_CONFIGS } from '../utils/constants';
import { TCallAccepted, TRequestConnectionData } from '../types/socket';
import { TUser } from '../types/user';

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
}

const AppContext: React.Context<AppContextProps> = createContext({} as AppContextProps);

export const AppProvider: React.FC<{ children: any; }> = ({ children }) => {

	const router = useRouter();

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

			socketRef.current.on('request-connection', (data: TRequestConnectionData) => {
				setIsReceivingMeetRequest(true);
				setOtherUserData(data.from);
				setOtherUserSignal(data.signal);
			});			

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
		
			socketRef.current.on('call-accepted', (data: TCallAccepted) => {
				setIsCallingUser(false);
				setMeetRequestAccepted(true);
				setMeetName(data.meetName);
				setOtherUserData(data.from);

				peer.signal(data.signal);
			});

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
			}); // @ts-ignore

			peer.signal(otherUserSignal);
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const rejectMeetRequest = () => {
		setIsReceivingMeetRequest(false);
		setMeetRequestAccepted(false);
	}

	useEffect(() => {
		const initSocketConnection = async () => {
			try {
				await fetch('/api/socket');
				socketRef.current = io();
			} catch (error) {
				console.log('Could not init socket connection! ', error);
			}
		}

		const setDefaultLaguage = () => {
			const language = localStorage.getItem('@MEET_COMPASS:language'); // @ts-ignore
			setSelectedLanguage(language || 'en');
			i18n.changeLanguage(language || 'en');
		}

		initSocketConnection();
		setDefaultLaguage();
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
				rejectMeetRequest
			}}
		>
			{ children }
		</AppContext.Provider>
	);

}

const useAppContext = () => useContext(AppContext);
export default useAppContext;
