import React, { useState, useEffect } from 'react';
import { BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff, BiDesktop, BiChat, BiPhoneOff, BiMove, BiUndo, BiDotsVerticalRounded } from 'react-icons/bi';
import Lottie from 'react-lottie'; // @ts-ignore
import { useSnackbar } from 'react-simple-snackbar';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import moment from 'moment';
import { io } from 'socket.io-client';

import { theme } from '../../styles/theme';
import * as emptyAnimation from '../../../public/assets/animations/empty.json';
import * as S from './styles';

const SNACKBAR_OPTIONS = {
	position: 'bottom-left',
	style: {
		backgroundColor: theme.colors.container,
		borderRadius: '.5rem',
		marginBottom: '86px',
		marginLeft: '8px',
		padding: '.25rem .5rem',
		fontFamily: theme.font.family,
		fontSize: theme.font.smallSize
	}
}

const Meet: NextPage = () => {

	const router = useRouter();
	const [ openSnackbar, closeSnackbar ] = useSnackbar(SNACKBAR_OPTIONS);

	const [ hasGuests, setHasGuests ] = useState<boolean>(true);
	const [ isSharingScreen, setIsSharingScreen ] = useState<boolean>(false);
	const [ isUsingVideo, setIsUsingVideo ] = useState<boolean>(false);
	const [ isUsingMicrophone, setIsUsingMicrophone ] = useState<boolean>(false);

	const handleDisplayHour = () => {
		const hour = moment().hours();
		return moment().format(`HH:mm [${hour >= 12 ? 'PM' : 'AM'}]`);
	}

	const handleHangUp = async () => { // @ts-ignore
		const userVideo = document.getElementById('user-video');
		if (userVideo) userVideo.remove();
		
		setIsUsingVideo(false);
		setIsUsingMicrophone(false);

		router.push('/home');
	}

	const handleUpdateUserAudioState = () => {
		try {
			const userVideo = document.getElementById('user-video'); // @ts-ignore
			if (userVideo) userVideo.muted = isUsingMicrophone;
			setIsUsingMicrophone(!isUsingMicrophone);
		} catch (error) {
			console.log('Could not change user audio! ', error);
		}
	}

	useEffect(() => {
		const displayUserVideo = (stream: MediaStream) => {
			try {
				const userVideo = document.createElement('video');
				const userVideoOptions = document.getElementById('user-video-options');
				const userVideoContainer = document.getElementById('user-video-container');
				
				userVideo.id = 'user-video';
				userVideo.className = 'user__video';
				userVideo.srcObject = stream;
				userVideo.autoplay = true;
	
				userVideoContainer?.insertBefore(userVideo, userVideoOptions);

				setIsUsingVideo(true);
				setIsUsingMicrophone(true);
			} catch (error) {
				console.log('Could not set user video! ', error);
			}
		}

		const setGuestVideo = (stream: MediaStream) => {
			try {
				const guestDiv = document.createElement('div');
				const guestId = document.createElement('span');
				const guestData = document.createElement('div');
				const guestVideo = document.createElement('video');
				const guestsContainer = document.getElementById('guests-container');

				guestDiv.id = 'guest-video';
				guestDiv.className = 'guest';
				guestId.className = 'guest__id';
				guestData.className = 'guest__data';

				guestVideo.className = 'guest__video';
				guestVideo.srcObject = stream;
				guestVideo.autoplay = true;
				guestVideo.muted = true;

				guestId.append('Nome do sacana');
				guestData.append(guestId);
				guestDiv.append(guestVideo);
				guestDiv.append(guestData);
				guestsContainer?.append(guestDiv);
			} catch (error) {
				console.log('Could not set guest video! ', error);
			}
		}

		const initSocketConnection = async () => {
			try {
				await fetch('/api/socket');
				const socket = io(); // @ts-ignore

				const peer = new Peer();
				const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
				displayUserVideo(userStream);

				// peer.on('call', (call: any) => {
				// 	call.answer(userStream);

				// 	call.on('stream', (guestStream: MediaStream) => {
				// 		setGuestVideo(guestStream);
				// 	});
				// });

				// socket.on('user-connected', userId => {
				// 	const call = peer.call(userId, userStream);
					
				// 	call.on('stream', (guestStream: MediaStream) => {
				// 		setGuestVideo(guestStream);
				// 	});
				// });

				// peer.on('open', (userId: string) => {
				// 	socket.emit('join-meet', router.query.id, userId);
				// });
			} catch (error) {
				console.log('Error: ', error);
			}
		}

		initSocketConnection();

		return () => {
			document.getElementById('user-video')?.remove();
			document.getElementById('guest-video')?.remove();
		};
	}, []);

	useEffect(() => {
		const userVideoContainer = document.getElementById('user-video-container');
		const resetPositionButton = document.getElementById('reset-position-button');
		const moveButton = document.getElementById('user-move-button');

		if (!userVideoContainer || !resetPositionButton || !moveButton) return;
		
		const initialPosition = {
			x: userVideoContainer.offsetLeft,
			y: userVideoContainer.offsetTop
		}

		let mousePosition;
		let calculedPosition = { x: 0, y: 0 };
		let isPressed = false;

		const onResetPosition = () => {
			userVideoContainer.style.left = initialPosition.x + 'px';
			userVideoContainer.style.top = initialPosition.y + 'px';
		}

		const onMouseDown = (event: MouseEvent) => {
			isPressed = true;

			calculedPosition.x = userVideoContainer.offsetLeft - event.clientX;
			calculedPosition.y = userVideoContainer.offsetTop - event.clientY;
		}

		const onMouseUp = () => {
			isPressed = false;
		}

		const onMouseMove = (event: MouseEvent) => {
			event.preventDefault();

			if (!isPressed) return;
			mousePosition = { x : event.clientX, y : event.clientY };

			const newPosition = {
				x: mousePosition.x + calculedPosition.x,
				y: mousePosition.y + calculedPosition.y
			}

			if (newPosition.x > 16 && newPosition.x < initialPosition.x) {
				userVideoContainer.style.left = newPosition.x + 'px';
			}

			if (newPosition.y > 16 && newPosition.y < initialPosition.y) {
				userVideoContainer.style.top = newPosition.y + 'px';
			}
		}

		resetPositionButton.addEventListener('click', onResetPosition, true);
		moveButton.addEventListener('mousedown', onMouseDown, true);
		document.addEventListener('mouseup', onMouseUp, true);
		document.addEventListener('mousemove', onMouseMove, true);

		return () => {
			resetPositionButton.removeEventListener('click', onResetPosition, true);
			moveButton.removeEventListener('mousedown', onMouseDown, true);
			document.removeEventListener('mouseup', onMouseUp, true);
			document.removeEventListener('mousemove', onMouseMove, true);
		}
	}, []);

	return (
		<S.MeetContainer isSharingScreen={ isSharingScreen } isUsingVideo={ isUsingVideo }>
			<Head>
				<title>Meet - Video Compass</title>
			</Head>

			<div className="meet">
				<main className="meet__content">
					<div className="meet__guests" id="guests-container">
					</div>

					{
						hasGuests && (
							<div className="empty">
								<Lottie
									width={ 550 }
									height={ 230 }
									isStopped={ false }
									isPaused={ false }
									options={{
										loop: true,
										autoplay: true, 
										animationData: emptyAnimation,
										rendererSettings: {
											preserveAspectRatio: 'xMidYMid slice'
										}
									}}
								/>

								<div>
									<h2 className="empty__title">
										There is nobody here!
									</h2>

									<p className="empty__message">
										Try to invite some friend of yours to have a call with you.
									</p>
								</div>
							</div>
						)
					}
				</main>

				<aside className="user" id="user-video-container">
					<div className="user__options" id="user-video-options">
						<button className="option option-grab" id="user-move-button">
							<BiMove />
						</button>

						<button className="option" id="reset-position-button">
							<BiUndo />
						</button>
					</div>
				</aside>

				<footer className="meet__footer">
					<div className="meet__data">
						<h3 className="meet__time">{ handleDisplayHour() }</h3>
						<div className="meet__data-divider" />
						<span className="meet__name">Team call</span>
					</div>

					<section className="meet__actions">
						<div className="action">
							<button className="action__button" onClick={ handleUpdateUserAudioState }>
								{ isUsingMicrophone ? <BiMicrophone className="action__button-icon" /> : <BiMicrophoneOff className="action__button-icon" /> }
							</button>

							<div className="action__tooltip">
								{ isUsingMicrophone ? 'Disable ' : 'Enable ' } microphone
							</div>
						</div>

						<div className="action">
							<button className="action__button" onClick={ () => setIsUsingVideo(!isUsingVideo) }>
								{ isUsingVideo ? <BiVideo className="action__button-icon" /> : <BiVideoOff className="action__button-icon" /> }
							</button>

							<div className="action__tooltip">
								{ isUsingVideo ? 'Disable ' : 'Enable ' } your video
							</div>
						</div>

						<div className="action">
							<button className="action__button action__button-sharing" onClick={ () => setIsSharingScreen(!isSharingScreen) }>
								<BiDesktop className="action__button-icon" />
							</button>

							<div className="action__tooltip">
								{ isSharingScreen ? 'Stop ' : 'Start ' } sharing your screen
							</div>
						</div>

						<div className="action">
							<button className="action__button">
								<BiChat className="action__button-icon" />
							</button>

							<div className="action__tooltip">
								Open chat
							</div>
						</div>

						<div className="action">
							<button className="action__button action__button-hangup" onClick={ handleHangUp }>
								<BiPhoneOff className="action__button-icon" />
							</button>

							<div className="action__tooltip">
								Left meeting
							</div>
						</div>
					</section>

					<div className="meet__options">
						<span className="meet__id">
							{ router.query.id }
						</span>

						<button className="meet__option" onClick={ () => openSnackbar('User Danieli is connection...', 5000000000000) }>
							<BiDotsVerticalRounded className="meet__option-icon" />
						</button>
					</div>
				</footer>
			</div>
		</S.MeetContainer>
	);

}

export default Meet;
