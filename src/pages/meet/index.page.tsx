import React, { useState, useEffect } from 'react';
import { BiMenu, BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff, BiDesktop, BiPhoneOff, BiMove, BiUndo, BiDotsVerticalRounded } from 'react-icons/bi';
import Lottie from 'react-lottie';
import { toast } from 'react-toastify';

import moment from 'moment';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ReceivingCallModal } from '../../components';
import useAppContext from '../../contexts/AppContext';

import { isEmpty } from '../../utils/functions';
import { TOAST_DEFAULT_CONFIG } from '../../utils/constants';

import * as emptyAnimation from '../../../public/assets/animations/empty.json';
import * as S from './styles';

const Meet: NextPage = () => {

	const router = useRouter();
	const {
		userVideoRef,
		otherUserVideoRef,
		meetName,
		userData,
		otherUserData,
		meetRequestAccepted,
		isReceivingMeetRequest,
		getUserStream
	} = useAppContext();

	const [ isSharingScreen, setIsSharingScreen ] = useState<boolean>(false);
	const [ isUsingVideo, setIsUsingVideo ] = useState<boolean>(false);
	const [ isUsingMicrophone, setIsUsingMicrophone ] = useState<boolean>(false);

	const handleCopyMeetId = () => {
		navigator.clipboard.writeText(userData.id);
		toast('Meet ID copied to your clipboard!', TOAST_DEFAULT_CONFIG);
	}

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
		if (isEmpty(userData)) router.push('/home');
		getUserStream();
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
				<title>Meet Compass - Metting</title>
			</Head>

			<header className="header">
				<h2 className="header__title">
					{ meetName || 'Meet name' }
				</h2>

				<button className="header__menu">
					<BiMenu />
				</button>
			</header>

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

			<main className="meet">
				{/* <div className="otheruser" id="other-user-container">
					<video
						muted
						playsInline
						autoPlay
						ref={ otherUserVideoRef }
						className="otheruser__video"
						id="otheruser-video"
					></video>

					<div className="otheruser__data">
						<span className="otheruser__name">
							{ otherUserData.name || 'My friend' }
						</span>
					</div>
				</div> */}
				<div className="empty">
					<Lottie
						width={ 550 / 2 }
						height={ 230 / 2 }
						isStopped={ false }
						isPaused={ false }
						isClickToPauseDisabled={ true }
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
							Try to invite a friend of you to have a meet <a onClick={ handleCopyMeetId }>clicking here.</a>
						</p>
					</div>
				</div>
			</main>

			<footer className="footer">
				<div className="footer__data">
					<h3 className="footer__time">
						{ handleDisplayHour() }
					</h3>
					
					<div className="footer__data-divider" />
					
					<span className="footer__name">
						{ meetName || 'Meet name' }
					</span>
				</div>
				
				<section className="footer__actions">
					<S.ActionButton>
						<button
							className="action__button"
							onClick={ handleUpdateUserAudioState }
						>
							{ isUsingMicrophone ? <BiMicrophone className="action__button-icon" /> : <BiMicrophoneOff className="action__button-icon" /> }
						</button>

						<div className="action__tooltip">
							{ isUsingMicrophone ? 'Disable ' : 'Enable ' } microphone
						</div>
					</S.ActionButton>

					<S.ActionButton>
						<button
							className="action__button"
							onClick={ () => setIsUsingVideo(!isUsingVideo) }
						>
							{ isUsingVideo ? <BiVideo className="action__button-icon" /> : <BiVideoOff className="action__button-icon" /> }
						</button>

						<div className="action__tooltip">
							{ isUsingVideo ? 'Disable ' : 'Enable ' } your video
						</div>
					</S.ActionButton>

					<S.ActionButton>
						<button
							className={`action__button ${isSharingScreen && 'action__button-sharing'}`}
							onClick={ () => setIsSharingScreen(!isSharingScreen) }
						>
							<BiDesktop className="action__button-icon" />
						</button>

						<div className="action__tooltip">
							{ isSharingScreen ? 'Stop ' : 'Start ' } sharing your screen
						</div>
					</S.ActionButton>

					<S.ActionButton>
						<button
							className="action__button action__button-hangup"
							onClick={ handleHangUp }
						>
							<BiPhoneOff className="action__button-icon" />
						</button>

						<div className="action__tooltip">
							Left meeting
						</div>
					</S.ActionButton>
				</section>

				<div className="footer__options">
					<span className="footer__meetid">
						{ userData.id }
					</span>

					<button className="footer__option">
						<BiDotsVerticalRounded className="footer__option-icon" />
					</button>
				</div>
			</footer>

			<ReceivingCallModal visible={ isReceivingMeetRequest && !meetRequestAccepted } />
		</S.MeetContainer>
	);

}

export default Meet;
