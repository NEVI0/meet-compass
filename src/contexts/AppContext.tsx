import React, { useRef, useState, useEffect, useContext, createContext } from 'react';

import { useRouter } from 'next/router';

import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';

import { PEER_CONFIGS } from '../utils/constants';
import { TUser } from '../types/user';

interface AppContextProps {
	socketRef: React.MutableRefObject<any>;
	userVideoRef: React.RefObject<HTMLVideoElement>;
	otherUserVideoRef: React.RefObject<HTMLVideoElement>;

	userData: TUser;
	otherUserData: TUser;

	userStream?: MediaStream;
	otherUserStream?: MediaStream;

	meetRequestAccepted: boolean;
	isReceivingMeetRequest: boolean;

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

	const [ userData, setUserData ] = useState<TUser>({} as TUser);
	const [ otherUserData, setOtherUserData ] = useState<TUser>({} as TUser);
	
	const [ userStream, setUserStream ] = useState<MediaStream>();
  	const [ otherUserStream, setOtherUserStream ] = useState<MediaStream>();

	const [ meetRequestAccepted, setMeetRequestAccepted ] = useState<boolean>(false);
	const [ isReceivingMeetRequest, setIsReceivingMeetRequest ] = useState<boolean>(false);

	const setInitialUserData = async (name: string, email: string, meetName: string = '') => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); 
			if (userVideoRef.current) userVideoRef.current.srcObject = stream;

			setUserStream(stream);
			setUserData({ id: socketRef.current.id, name, email, meetName });

			socketRef.current.emit('save-user-data', { id: socketRef.current.id, name, email, meetName });
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const startNewMeet = async (userName: string, userEmail: string, meetName: string) => {
		try {
			await setInitialUserData(userName, userEmail, meetName);

			socketRef.current.on('request-connection', (data: any) => {
				setIsReceivingMeetRequest(true);
				setOtherUserData({ ...data.from, meetName: userData.meetName });
				setOtherUserStream(data.stream);
			});			

			router.push('/meet');
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const meetOtherUser = async (userName: string, userEmail: string, userToCallId: string) => {
		try {
			const peer = new SimplePeer({
				initiator: true,
				trickle: false,
				config: PEER_CONFIGS,
				stream: userStream, 
			});

			await setInitialUserData(userName, userEmail);

			peer.on('signal', data => {
				socketRef.current.emit('call-user', {
					userToCall: userToCallId,
					stream: data,
					from: userData.id
				});
			})
		
			peer.on('stream', stream => {
				if (otherUserVideoRef.current) otherUserVideoRef.current.srcObject = stream;
			});
		
			socketRef.current.on('call-accepted', (signal: any) => {
				setMeetRequestAccepted(true);

				peer.signal(signal);
				router.push('/meet');
			});
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const acceptMeetRequest = () => {
		try {
			const peer = new SimplePeer({
				initiator: false,
				trickle: false,
				stream: userStream
			});

			peer.on('signal', data => {
				socketRef.current.emit('accept-meet', { signal: data, to: otherUserData })
			});

			peer.on('stream', stream => {
				if (otherUserVideoRef.current) otherUserVideoRef.current.srcObject = stream;
			}); // @ts-ignore

			peer.signal(otherUserStream);
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const rejectMeetRequest = () => {
		setIsReceivingMeetRequest(false);
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

		initSocketConnection();
	}, []);

	return (
		<AppContext.Provider
			value={{ 
				socketRef,
				userVideoRef,
				otherUserVideoRef,

				userData,
				otherUserData,
				userStream,
				otherUserStream,
				
				startNewMeet,
				meetRequestAccepted,
				isReceivingMeetRequest,

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
