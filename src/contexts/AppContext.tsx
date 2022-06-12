import React, { useRef, useState, useEffect, useContext, createContext } from 'react';

import { useRouter } from 'next/router';

import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';

import { PEER_CONFIGS } from '../utils/constants';

interface AppContextProps {
	socketRef: React.MutableRefObject<any>;
	userVideoRef: React.RefObject<HTMLVideoElement>;
	guestVideoRef: React.RefObject<HTMLVideoElement>;

	userId: string;
	guestId: string;
	userStream?: MediaStream;
	guestSignal?: MediaStream;

	callAccepted: boolean;
	isReceivingCall: boolean;

	callGuest: (id: string) => void;
	acceptCall: () => void;
}

const AppContext: React.Context<AppContextProps> = createContext({} as AppContextProps);

export const AppProvider: React.FC<{ children: any; }> = ({ children }) => {

	const router = useRouter();

	const socketRef = useRef<any>(null);
	const userVideoRef = useRef<HTMLVideoElement>(null);
	const guestVideoRef = useRef<HTMLVideoElement>(null);

	const [ userId, setUserId ] = useState<string>('');
	const [ userStream, setUserStream ] = useState<MediaStream>();
	const [ guestId, setGuestId ] = useState<string>('');
  	const [ guestSignal, setGuestSignal ] = useState<MediaStream>();

	const [ callAccepted, setCallAccepted ] = useState<boolean>(false);
	const [ isReceivingCall, setIsReceivingCall ] = useState<boolean>(false);

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

	useEffect(() => {
		const initSocketConnection = async () => {
			try {
				await fetch('/api/socket');
				socketRef.current = io();
				
				const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); 
				if (userVideoRef.current) userVideoRef.current.srcObject = stream;

				setUserStream(stream);
				setUserId(socketRef.current.id);				

				socketRef.current.on('request-connection', (data: any) => {
					setIsReceivingCall(true);
					setGuestId(data.from);
					setGuestSignal(data.signal);
				});
			} catch (error) {
				console.log('Error: ', error);
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

				userId,
				guestId,
				userStream,
				guestSignal,
				
				callAccepted,
				isReceivingCall,

				callGuest,
				acceptCall
			}}
		>
			{ children }
		</AppContext.Provider>
	);

}

const useAppContext = () => useContext(AppContext);
export default useAppContext;
