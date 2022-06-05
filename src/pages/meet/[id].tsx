import React, { useState, useEffect } from 'react';
import { BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff, BiDesktop, BiChat, BiPhoneOff, BiMove, BiUndo } from 'react-icons/bi';
import Lottie from 'react-lottie';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import moment from 'moment';

import * as emptyAnimation from '../../../public/assets/animations/empty.json';
import * as S from './styles';

const Meet: NextPage = () => {

	const router = useRouter();
	
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
		<S.MeetContainer isUsingVideo={ isUsingVideo }>
			<Head>
				<title>Meet - Video Compass</title>
			</Head>

			<div className="meet">
				<main className="meet__content">
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
						<button className="action" onClick={ handleChangeUserAudioState }>
							{ isUsingMicrophone ? <BiMicrophone className="action-icon" /> : <BiMicrophoneOff className="action-icon" /> }
						</button>

						<button className="action" onClick={ handleChangeUserVideoState }>
							{ isUsingVideo ? <BiVideo className="action-icon" /> : <BiVideoOff className="action-icon" /> }
						</button>

						<button className="action">
							<BiDesktop className="action-icon" />
						</button>

						<button className="action">
							<BiChat className="action-icon" />
						</button>

						<button className="action action-hangup" onClick={ handleHangUp }>
							<BiPhoneOff className="action-icon" />
						</button>
					</section>

					<span className="meet__id">
						{ router.query.id }
					</span>
				</footer>
			</div>
		</S.MeetContainer>
	);

}

export default Meet;
