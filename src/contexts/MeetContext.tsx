import React, { useRef, useState, useEffect, useContext, createContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';

import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import { TCallAcceptedEventData, TRequestMeetConnectionEventData, TUser } from '../utils/types';
import { PEER_CONFIGS, TOAST_DEFAULT_CONFIG } from '../utils/constants';
import { isEmpty } from '../utils/functions';

interface MeetContextProps {
	socketRef: React.RefObject<any>;
	userVideoRef: React.RefObject<HTMLVideoElement>;
	otherUserVideoRef: React.RefObject<HTMLVideoElement>;

	meetName: string;
	userData: TUser;
	otherUserData: TUser;
	callingOtherUserData: TUser;

	isOtherUserMuted: boolean;
	isOtherUserVideoStopped: boolean;

	userStream?: MediaStream;

	isCallingUser: boolean;
	meetRequestAccepted: boolean;
	isReceivingMeetRequest: boolean;
	
	isSharingScreen: boolean;
	isUsingVideo: boolean;
	isUsingMicrophone: boolean;
	isOtherUserSharingScreen: boolean;	

	getUserStream: () => Promise<MediaStream | undefined>;
	startNewMeet: (userName: string, userEmail: string, meetName: string) => boolean;
	joinMeet: (userName: string, userEmail: string, userToCallId: string) => void;
	acceptMeetRequest: () => void;
	rejectMeetRequest: () => void;
	cancelMeetRequest: () => void;
	renameMeet: (newMeetName: string) => void;
	removeOtherUserFromMeet: () => void;
	leftMeet: () => void;
	updateStreamAudio: () => void;
	updateStreamVideo: () => void;
	updateScreenSharing: () => void;
	clearUserStream: () => void;
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
	const [ callingOtherUserData, setCallingOtherUserData ] = useState<TUser>({} as TUser);
	
	const [ isOtherUserMuted, setIsOtherUserMuted ] = useState<boolean>(false);
	const [ isOtherUserVideoStopped, setIsOtherUserVideoStopped ] = useState<boolean>(false);

	const [ userStream, setUserStream ] = useState<MediaStream>();
  	const [ otherUserSignal, setOtherUserSignal ] = useState<SimplePeer.SignalData>();
  	const [ callingOtherUserSignal, setCallingOtherUserSignal ] = useState<SimplePeer.SignalData>();

	const [ isCallingUser, setIsCallingUser ] = useState<boolean>(false);
	const [ meetRequestAccepted, setMeetRequestAccepted ] = useState<boolean>(false);
	const [ isReceivingMeetRequest, setIsReceivingMeetRequest ] = useState<boolean>(false);
	
	const [ isSharingScreen, setIsSharingScreen ] = useState<boolean>(false);
	const [ isUsingVideo, setIsUsingVideo ] = useState<boolean>(false);
	const [ isUsingMicrophone, setIsUsingMicrophone ] = useState<boolean>(false);
	const [ isOtherUserSharingScreen, setIsOtherUserSharingScreen ] = useState<boolean>(false);

	const [ disconnectedOtherUserId, setDisconnectedOtherUserId ] = useState<string>('');

	const clearMeetData = () => {
		setOtherUserData({} as TUser);
		setOtherUserSignal(undefined);

		setCallingOtherUserData({} as TUser);
		setCallingOtherUserSignal(undefined);

		setIsCallingUser(false);
		setMeetRequestAccepted(false);
		setIsReceivingMeetRequest(false);

		setIsSharingScreen(false);
		setIsOtherUserSharingScreen(false);
	}

	const clearUserStream = () => {
		setUserStream(undefined);
	}

	const getUserStream = async () => {
		try {
			const stream = userStream ? userStream : await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); 
			if (userVideoRef.current) userVideoRef.current.srcObject = stream;

			setUserStream(stream);
			setIsUsingVideo(true);
			setIsUsingMicrophone(true);

			return stream;
		} catch (error) {
			setIsUsingVideo(false);
			setIsUsingMicrophone(false);

			toast(t('toastMessage.allowGetVideoAndAudio'), TOAST_DEFAULT_CONFIG);
		}
	}

	const checkUserStream = async () => {
		let stream = userStream;

		if (!stream) {
			stream = await getUserStream();
			if (!stream) return true;
		}

		return false;
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

			socketRef.current.emit('check-meet-link', userToCallId);

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

	const acceptMeetRequest = () => {
		setMeetRequestAccepted(true);
		setIsReceivingMeetRequest(false);

		const otherUser = {
			data: callingOtherUserData,
			signal: callingOtherUserSignal
		}

		setOtherUserData(otherUser.data);
		setOtherUserSignal(otherUser.signal);

		setCallingOtherUserData({} as TUser);
		setCallingOtherUserSignal(undefined);

		const peer = new SimplePeer({
			initiator: false,
			trickle: false,
			stream: userStream
		});

		peer.on('signal', data => {
			socketRef.current.emit('accept-call', {
				from: userData,
				to: otherUser.data.id,
				signal: data,
				meetName
			});
		});

		peer.on('stream', stream => { 
			if (otherUserVideoRef.current) otherUserVideoRef.current.srcObject = stream;
		});

		peerRef.current = peer;  // @ts-ignore
		peer.signal(otherUser.signal);
	}

	const rejectMeetRequest = () => {
		socketRef.current.emit('reject-call', callingOtherUserData.id);
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
		socketRef.current.emit('remove-from-meet', otherUserData.id);
		clearMeetData();
	}

	const leftMeet = () => {
		const clearUserData = () => {
			setUserData({} as TUser);

			setIsUsingVideo(false);
			setIsUsingMicrophone(false);

			setMeetName('');
		}

		socketRef.current.emit('left-meet', otherUserData.id);
		if (peerRef.current) peerRef.current.destroy();
		userVideoRef.current?.remove();
		
		clearUserData();
		clearMeetData();

		router.replace('/home?stopStream=true');
	}

	const updateStreamAudio = async () => {
		const hasNoStream = await checkUserStream();
		if (hasNoStream) return;

		socketRef.current.emit('update-user-audio', { to: otherUserData.id, shouldMute: isUsingMicrophone });
		setIsUsingMicrophone(!isUsingMicrophone);
	}

	const updateStreamVideo = async () => {
		const hasNoStream = await checkUserStream();
		if (hasNoStream) return;

		socketRef.current.emit('update-user-video', { to: otherUserData.id, shouldStop: isUsingVideo });
		setIsUsingVideo(!isUsingVideo);
	}

	const updateScreenSharing = async () => {
		try {
			if (isEmpty(otherUserData)) return toast(t('toastMessage.canNotshareScreen'), TOAST_DEFAULT_CONFIG);

			const hasNoStream = await checkUserStream();
			if (hasNoStream) return;
			
			let stream;

			if (isSharingScreen) {
				stream = userStream;
				setIsSharingScreen(false);

				socketRef.current.emit('update-screen-sharing', { to: otherUserData.id, isSharing: false })
			} else {
				stream = await navigator.mediaDevices.getDisplayMedia();
				setIsSharingScreen(true);

				socketRef.current.emit('update-screen-sharing', { to: otherUserData.id, isSharing: true })
			}

			const [ oldStream ] = peerRef.current.streams;
			const [ oldTrack ] = oldStream.getVideoTracks();
			const [ newTrack ] = stream?.getVideoTracks()!;

			newTrack.onended = () => {
				const [ userTrack ] = userStream?.getVideoTracks()!;
				peerRef.current.replaceTrack(oldTrack, userTrack, oldStream);

				setIsSharingScreen(false);
			}

			peerRef.current.replaceTrack(oldTrack, newTrack, oldStream);
		} catch (error) {
			toast(t('toastMessage.sharingScreenError'), TOAST_DEFAULT_CONFIG);
		}
	}

	useEffect(() => {
		const handleSocketConnection = async () => {
			try {
				
				await fetch('/api/socket');
				socketRef.current = io();

				// Generic events
				socketRef.current.on('link-not-available', () => {
					cancelMeetRequest();

					const tracks = userStream?.getTracks();
					tracks?.forEach(track => track.stop());

					router.replace('/home?stopStream=true');
					toast(t('toastMessage.linkNotAvailable'), TOAST_DEFAULT_CONFIG);
				});

				socketRef.current.on('update-meet-name', (newMeetName: string) => {
					setMeetName(newMeetName);
					toast(t('toastMessage.meetNameUpdated'), TOAST_DEFAULT_CONFIG);
				});

				// Disconnections events
				socketRef.current.on('user-left', (userDisconnectedId: string) => {
					setDisconnectedOtherUserId(userDisconnectedId);
				});

				socketRef.current.on('removed-from-meet', () => {
					setMeetName('');
					clearMeetData();

					peerRef.current.destroy();
					
					router.replace('/home?stopStream=true');
					toast(t('toastMessage.userRemovedFromMeet'), TOAST_DEFAULT_CONFIG);
				});

				socketRef.current.on('other-user-left-meet', () => {
					setMeetName('');
					clearMeetData();
					peerRef.current.destroy();

					toast(t('toastMessage.otherUserLeftMeet'), TOAST_DEFAULT_CONFIG);
				});

				// Meet stream events
				socketRef.current.on('update-other-user-audio', (shouldMute: boolean) => {
					if (otherUserVideoRef.current) {
						otherUserVideoRef.current.muted = shouldMute;
						setIsOtherUserMuted(shouldMute);
					}
				});

				socketRef.current.on('update-other-user-video', (shouldStop: boolean) => {
					setIsOtherUserVideoStopped(shouldStop);
				});

				socketRef.current.on('update-other-user-screen-sharing', (isSharing: boolean) => {
					setIsOtherUserSharingScreen(isSharing);
				});

				// Meet initiation events
				socketRef.current.on('request-meet-connection', (data: TRequestMeetConnectionEventData) => {
					setIsReceivingMeetRequest(true);
					setCallingOtherUserData(data.from);
					setCallingOtherUserSignal(data.signal);
				});

				socketRef.current.on('call-accepted', (data: TCallAcceptedEventData) => {
					setIsCallingUser(false);
					setMeetRequestAccepted(true);
					setMeetName(data.meetName);
					setOtherUserData(data.from);
	
					peerRef.current.signal(data.signal);
				});

				socketRef.current.on('call-rejected', () => {
					clearMeetData();
					peerRef.current.destroy();

					toast(t('toastMessage.requestDeclined'), TOAST_DEFAULT_CONFIG);
				});

				socketRef.current.on('other-user-already-in-meet', () => {
					cancelMeetRequest();
					toast(t('toastMessage.otherUserInMeet'), TOAST_DEFAULT_CONFIG);
				});

			} catch (error) {
				console.log('Could not init socket connection! ', error);
			}
		}

		handleSocketConnection();

		return () => {
			if (socketRef.current) {
				socketRef.current.off('link-not-available');
				socketRef.current.off('update-meet-name');

				socketRef.current.off('user-left');
				socketRef.current.off('removed-from-meet');
				socketRef.current.off('other-user-left-meet');

				socketRef.current.off('update-other-user-audio');
				socketRef.current.off('update-other-user-video');
				socketRef.current.off('update-other-user-screen-sharing');

				socketRef.current.off('request-meet-connection');
				socketRef.current.off('call-accepted');
				socketRef.current.off('call-rejected');
				socketRef.current.off('other-user-already-in-meet');
			}
		};
	}, []);

	useEffect(() => {
		if (isReceivingMeetRequest) {
			const alreadyInMeet = otherUserSignal || !isEmpty(otherUserData);
			if (alreadyInMeet) socketRef.current.emit('already-in-meet', callingOtherUserData.id);
		}
	}, [isReceivingMeetRequest]);

	useEffect(() => {
		if (disconnectedOtherUserId) {
			if (disconnectedOtherUserId === otherUserData.id) {
				clearMeetData();
				peerRef.current.destroy();

				toast(t('toastMessage.otherUserLeftMeet'), TOAST_DEFAULT_CONFIG);
			} else {
				setDisconnectedOtherUserId('');
			}
		}
	}, [disconnectedOtherUserId]);

	return (
		<MeetContext.Provider
			value={{
				socketRef,
				userVideoRef,
				otherUserVideoRef,

				meetName,
				userData,
				otherUserData,
				callingOtherUserData,

				isOtherUserMuted,
				isOtherUserVideoStopped,

				userStream,

				isCallingUser,
				meetRequestAccepted,
				isReceivingMeetRequest,
				
				isSharingScreen,
				isUsingVideo,
				isUsingMicrophone,
				isOtherUserSharingScreen,

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
				updateStreamVideo,
				updateScreenSharing,
				clearUserStream
			}}
		>
			{ children }
		</MeetContext.Provider>
	);

}

const useMeetContext = () => useContext(MeetContext);
export default useMeetContext;
