import React, { useRef, useState, useEffect, useContext, createContext } from 'react';

import { useRouter } from 'next/router';

import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';

import { PEER_CONFIGS } from '../utils/constants';

interface AppContextProps {
	socketRef: React.MutableRefObject<any>;
	userVideoRef: React.RefObject<HTMLVideoElement>;
	guestVideoRef: React.RefObject<HTMLVideoElement>;

	meetName: string;
	userId: string;
	guestId: string;
	userStream?: MediaStream;
	guestSignal?: MediaStream;

	callAccepted: boolean;
	isReceivingCall: boolean;

	startNewMeet: (userName: string, userEmail: string, meet: string) => void;
	callGuest: (id: string) => void;
	acceptCall: () => void;
	rejectCallRequest: () => void;
}

const AppContext: React.Context<AppContextProps> = createContext({} as AppContextProps);

export const AppProvider: React.FC<{ children: any; }> = ({ children }) => {

	const router = useRouter();

	const socketRef = useRef<any>(null);
	const userVideoRef = useRef<HTMLVideoElement>(null);
	const guestVideoRef = useRef<HTMLVideoElement>(null);

	const [ meetName, setMeetName ] = useState<string>('');

	const [ userId, setUserId ] = useState<string>('');
	const [ userStream, setUserStream ] = useState<MediaStream>();
	const [ guestId, setGuestId ] = useState<string>('');
  	const [ guestSignal, setGuestSignal ] = useState<MediaStream>();

	const [ callAccepted, setCallAccepted ] = useState<boolean>(false);
	const [ isReceivingCall, setIsReceivingCall ] = useState<boolean>(false);

	const startNewMeet = async (userName: string, userEmail: string, meet: string) => {
		try {			
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); 
			if (userVideoRef.current) userVideoRef.current.srcObject = stream;

			setMeetName(meet);
			setUserStream(stream);
			setUserId(socketRef.current.id);
			
			socketRef.current.emit('meet-data', {
				id: socketRef.current.id,
				name: userName,
				email: userEmail,
				meetName: meet
			});

			socketRef.current.on('request-connection', (data: any) => {
				setIsReceivingCall(true);
				setGuestId(data.from);
				setGuestSignal(data.signal);
			});			

			router.push('/call');
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const callGuest = (id: string) => {
		try {
			const peer = new SimplePeer({
				initiator: true,
				trickle: false,
				config: PEER_CONFIGS,
				stream: userStream, 
			});

			peer.on('signal', data => {
				socketRef.current.emit('call-guest', {
					guestToCall: id,
					signal: data,
					from: userId
				});
			})
		
			peer.on('stream', stream => {
				if (guestVideoRef.current) guestVideoRef.current.srcObject = stream;
			});
		
			socketRef.current.on('call-accepted', (signal: any) => {
				setCallAccepted(true);

				peer.signal(signal);
				router.push('/meet');
			});
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const acceptCall = () => {
		try {
			const peer = new SimplePeer({
				initiator: false,
				trickle: false,
				stream: userStream
			});

			peer.on('signal', data => {
				socketRef.current.emit('accept-call', { signal: data, to: guestId })
			});

			peer.on('stream', stream => {
				if (guestVideoRef.current) guestVideoRef.current.srcObject = stream;
			}); // @ts-ignore

			peer.signal(guestSignal);
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	const rejectCallRequest = () => {
		setIsReceivingCall(false);
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
				guestVideoRef,

				meetName,
				userId,
				guestId,
				userStream,
				guestSignal,
				
				startNewMeet,
				callAccepted,
				isReceivingCall,

				callGuest,
				acceptCall,
				rejectCallRequest
			}}
		>
			{ children }
		</AppContext.Provider>
	);

}

const useAppContext = () => useContext(AppContext);
export default useAppContext;
