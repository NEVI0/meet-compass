import React, { useRef, useState, useEffect } from 'react';
import { BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff, BiDesktop, BiChat, BiPhoneOff, BiMove, BiUndo, BiDotsVerticalRounded } from 'react-icons/bi';
import Lottie from 'react-lottie';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import moment from 'moment';

import { ReceivingCallModal } from '../../components';
import useAppContext from '../../contexts/AppContext';

import * as emptyAnimation from '../../../public/assets/animations/empty.json';
import * as S from './styles';

const Meet: NextPage = () => {

	const router = useRouter();
	const { userId, guestId, isReceivingCall, userVideoRef, guestVideoRef } = useAppContext();

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
				<title>Call - Meet Compass</title>
			</Head>

			<div className="meet">
				<main className="meet__content">
					{
						guestId ? (
							<div className="guest">
								<video
									playsInline
									autoPlay
									ref={ guestVideoRef }
									className="guest__video"
									id="guest-video"
								></video>

								<div className="guest__data">
									<span className="guest__id">
										dsbhfbsdjbfjsdjhfdsadas
									</span>
								</div>
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
					<video
						muted
						playsInline
						autoPlay
						ref={ userVideoRef }
						className="user__video"
						id="user-video"
					></video>

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

						{/* <div className="action">
							<button className="action__button">
								<BiChat className="action__button-icon" />
							</button>

							<div className="action__tooltip">
								Open chat
							</div>
						</div> */}

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
							{ userId }
						</span>

						<button className="meet__option">
							<BiDotsVerticalRounded className="meet__option-icon" />
						</button>
					</div>
				</footer>
			</div>

			<ReceivingCallModal
				visible={ isReceivingCall }
				onClose={ () => null }
			/>
		</S.MeetContainer>
	);

}

export default Meet;
