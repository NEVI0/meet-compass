import React, { useState, useEffect } from 'react';
import { BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff, BiDesktop, BiChat, BiPhoneOff, BiMove, BiUndo, BiDotsVerticalRounded } from 'react-icons/bi';
import Lottie from 'react-lottie'; // @ts-ignore
import { useSnackbar } from 'react-simple-snackbar';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import moment from 'moment';

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

	const [ hasGuests, setHasGuests ] = useState<boolean>(false);
	const [ isSharingScreen, setIsSharingScreen ] = useState<boolean>(false);
	const [ isUsingVideo, setIsUsingVideo ] = useState<boolean>(true);
	const [ isUsingMicrophone, setIsUsingMicrophone ] = useState<boolean>(true);

	const handleDisplayHour = () => {
		const hour = moment().hours();
		return moment().format(`HH:mm [${hour >= 12 ? 'PM' : 'AM'}]`);
	}

	const handleChangeUserVideoState = () => {
		try { // @ts-ignore
			localStream.getVideoTracks()[0].enabled = !isUsingVideo;
			setIsUsingVideo(!isUsingVideo);
		} catch (err) {
			console.log('Error: ', err);
		}
	}

	const handleChangeUserAudioState = () => {
		try { // @ts-ignore
			localStream.getAudioTracks()[0].enabled = !isUsingMicrophone;
			setIsUsingMicrophone(!isUsingMicrophone);
		} catch (err) {
			console.log('Error: ', err);
		}
	}

	const handleHangUp = async () => { // @ts-ignore
		localStream.getTracks().forEach(track => track.stop());
		router.push('/home');
	}

	useEffect(() => {
		const getUserMedia = async () => {
			try {
				const userVideo = document.getElementById('user-video');
				const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); // @ts-ignore
				
				window.localStream = stream; // @ts-ignore
				userVideo.srcObject = stream;

				handleChangeUserVideoState();
				handleChangeUserAudioState();
			} catch (err) {
				console.log('Error: ', err);
			}
		}

		getUserMedia();
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
		<S.MeetContainer hasGuests={ hasGuests } isSharingScreen={ isSharingScreen } isUsingVideo={ isUsingVideo }>
			<Head>
				<title>Meet - Video Compass</title>
			</Head>

			<div className="meet">
				<main className="meet__content">
					{
						hasGuests ? (
							<div className="meet__guests">
								{
									new Array(1).fill(0).map((_, index) => (
										<div key={ index.toString() }className="guest">
											<video src="public/assets/test.mp4" autoPlay={ true } controls={ true } className="guest__video" id="guest-video"></video>

											<div className="guest__data">
												<span className="guest__name">
													Hernesto Rodrigez
												</span>

												<BiMicrophoneOff className="guest__microphone-icon" />
											</div>
										</div>
									))
								}
							</div>
						) : (
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
					<video autoPlay={ true } className="user__video" id="user-video"></video>

					<div className="user__options">
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
							<button className="action__button" onClick={ handleChangeUserAudioState }>
								{ isUsingMicrophone ? <BiMicrophone className="action__button-icon" /> : <BiMicrophoneOff className="action__button-icon" /> }
							</button>

							<div className="action__tooltip">
								{ isUsingMicrophone ? 'Disable ' : 'Enable ' } microphone
							</div>
						</div>

						<div className="action">
							<button className="action__button" onClick={ handleChangeUserVideoState }>
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
