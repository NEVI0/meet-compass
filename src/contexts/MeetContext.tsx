import React, { useRef, useState, useEffect, useContext, createContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';

import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import { TCallAccepted, TRequestConnectionData, TUser, TUserLeft } from '../utils/types';
import { PEER_CONFIGS, TOAST_DEFAULT_CONFIG } from '../utils/constants';
import { isEmpty } from '../utils/functions';

interface MeetContextProps {
	socketRef: React.RefObject<any>;
	userVideoRef: React.RefObject<HTMLVideoElement>;
	otherUserVideoRef: React.RefObject<HTMLVideoElement>;

	meetName: string;
	userData: TUser;
	otherUserData: TUser;

	isOtherUserMuted: boolean;
	isOtherUserVideoStopped: boolean;

	isCallingUser: boolean;
	meetRequestAccepted: boolean;
	isReceivingMeetRequest: boolean;

	getUserStream: () => Promise<MediaStream | undefined>;
	startNewMeet: (userName: string, userEmail: string, meetName: string) => boolean;
	joinMeet: (userName: string, userEmail: string, userToCallId: string) => void;
	acceptMeetRequest: () => void;
	rejectMeetRequest: () => void;
	cancelMeetRequest: () => void;
	renameMeet: (newMeetName: string) => void;
	removeOtherUserFromMeet: () => void;
	leftMeet: () => void;
	updateStreamAudio: (shouldMute: boolean) => void;
	updateStreamVideo: (shouldStop: boolean) => void;
}

const MeetContext: React.Context<MeetContextProps> = createContext({} as MeetContextProps);

export const MeetProvider: React.FC<{ children: any }> = ({ children }) => {

	const router = useRouter();
	const { t } = useTranslation();

	const peerRef = useRef<any>(null);
	const socketRef = useRef<any>(null);
	const userVideoRef = useRef<HTMLVideoElement>(null);
	const otherUserVideoRef = useRef<HTMLVideoElement>(null);

	const [ meetName, setMeetName ] = useState<string>('');
	const [ userData, setUserData ] = useState<TUser>({} as TUser);
	const [ otherUserData, setOtherUserData ] = useState<TUser>({} as TUser);
	
	const [ isOtherUserMuted, setIsOtherUserMuted ] = useState<boolean>(false);
	const [ isOtherUserVideoStopped, setIsOtherUserVideoStopped ] = useState<boolean>(false);

	const [ userStream, setUserStream ] = useState<MediaStream>();
  	const [ otherUserSignal, setOtherUserSignal ] = useState<SimplePeer.SignalData>();

	const [ isCallingUser, setIsCallingUser ] = useState<boolean>(false);
	const [ meetRequestAccepted, setMeetRequestAccepted ] = useState<boolean>(false);
	const [ isReceivingMeetRequest, setIsReceivingMeetRequest ] = useState<boolean>(false);


	const clearMeetData = () => {
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

	const startNewMeet = (userName: string, userEmail: string, meet: string) => {
		try {
			const user = { id: socketRef.current.id, name: userName, email: userEmail };
			socketRef.current.emit('save-user-data', user);
			
			setUserData(user);
			setMeetName(meet);		

			return true;
		} catch (error) {
			return false;
		}
	}

	const joinMeet = async (userName: string, userEmail: string, userToCallId: string) => {
		try {
			const stream = await getUserStream();
			setIsCallingUser(true);

			const peer = new SimplePeer({
				initiator: true,
				trickle: false,
				config: PEER_CONFIGS,
				stream
			});

			const user = { id: socketRef.current.id, name: userName, email: userEmail };
			socketRef.current.emit('save-user-data', user);
			setUserData(user);

			socketRef.current.emit('user-to-call-exists', userToCallId);

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

			const peer = new SimplePeer({ initiator: false, trickle: false, stream: userStream });

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
		clearMeetData();
	}

	const cancelMeetRequest = () => {
		peerRef.current.destroy();
		clearMeetData();
	}

	const renameMeet = (newMeetName: string) => {
		socketRef.current.emit('meet-new-name', { to: otherUserData.id, newMeetName });
		setMeetName(newMeetName);
	}

	const removeOtherUserFromMeet = () => {
		socketRef.current.emit('remove-user', { userToRemove: otherUserData });
		clearMeetData();
	}

	const leftMeet = () => {
		socketRef.current.emit('left-meet', { to: otherUserData.id });
		if (peerRef.current) peerRef.current.destroy();

		clearMeetData();
		setMeetName('');

		router.push('/home');
	}

	const updateStreamAudio = (shouldMute: boolean) => {
		socketRef.current.emit('handle-user-audio', { to: otherUserData.id, shouldMute });
	}

	const updateStreamVideo = (shouldStop: boolean) => {
		socketRef.current.emit('handle-user-video', { to: otherUserData.id, shouldStop });
	}

	useEffect(() => {
		const handleSocketConnection = async () => {
			try {
				await fetch('/api/socket');
				socketRef.current = io();

				socketRef.current.on('link-not-available', () => {
					toast(t('page.meet.toast.linkNotAvailable'), TOAST_DEFAULT_CONFIG);
					cancelMeetRequest();
				});

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
					clearMeetData();
					peerRef.current.destroy();
					toast(t('page.meet.toast.requestDeclined'), TOAST_DEFAULT_CONFIG);
				});

				socketRef.current.on('user-left', () => {
					const isOtherUserDisconnected = !otherUserSignal || isEmpty(otherUserData);
					if (isOtherUserDisconnected) return;

					clearMeetData();
					peerRef.current.destroy();
				});

				socketRef.current.on('removed-from-meet', () => {
					toast(t('page.meet.toast.userRemoved'), TOAST_DEFAULT_CONFIG);

					setMeetName('');
					peerRef.current.destroy();

					router.push('/home');
				});

				socketRef.current.on('other-user-left-meet', () => {
					toast(t('page.meet.toast.otherUserLeft'), TOAST_DEFAULT_CONFIG);
					clearMeetData();
					setMeetName('');
					peerRef.current.destroy();
				});

				socketRef.current.on('update-meet-name', (newMeetName: string) => {
					setMeetName(newMeetName);
					toast(t('page.meet.toast.meetNameUpdated'), TOAST_DEFAULT_CONFIG);
				});

				socketRef.current.on('handle-other-user-audio', (shouldMute: boolean) => {
					if (otherUserVideoRef.current) {
						otherUserVideoRef.current.muted = shouldMute;
						setIsOtherUserMuted(shouldMute);
					}
				});

				socketRef.current.on('handle-other-user-video', (shouldStop: boolean) => {
					setIsOtherUserVideoStopped(shouldStop);
				});
			} catch (error) {
				console.log('Could not init socket connection! ', error);
			}
		}

		handleSocketConnection();
	}, []);

	return (
		<MeetContext.Provider
			value={{
				socketRef,
				userVideoRef,
				otherUserVideoRef,

				meetName,
				userData,
				otherUserData,

				isOtherUserMuted,
				isOtherUserVideoStopped,

				isCallingUser,
				meetRequestAccepted,
				isReceivingMeetRequest,

				getUserStream,
				startNewMeet,
				joinMeet,
				acceptMeetRequest,
				rejectMeetRequest,
				cancelMeetRequest,
				renameMeet,
				removeOtherUserFromMeet,
				leftMeet,
				updateStreamAudio,
				updateStreamVideo
			}}
		>
			{ children }
		</MeetContext.Provider>
	);

}

const useMeetContext = () => useContext(MeetContext);
export default useMeetContext;
