import React, { useState } from 'react';
import { BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff, BiDesktop, BiChat, BiPhoneOff, BiDotsHorizontalRounded } from 'react-icons/bi';
import Lottie from 'react-lottie';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import moment from 'moment';

import * as emptyAnimation from '../../../public/assets/animations/empty.json';
import * as S from './styles';

const Meet: NextPage = () => {

	const router = useRouter();
	
	const [ isUsingVideo, setIsUsingVideo ] = useState<boolean>(false);
	const [ isUsingMicrophone, setIsUsingMicrophone ] = useState<boolean>(false);

	const handleDisplayHour = () => {
		const hour = moment().hours();
		return moment().format(`HH:mm [${hour >= 12 ? 'PM' : 'AM'}]`);
	}

	const handleGetUserVideo = async () => {
		try {
			const userVideo = document.getElementById('user-video');
			const video = await navigator.mediaDevices.getUserMedia({ video: true }); // @ts-ignore

			window.localStream = video; // @ts-ignore
			userVideo.srcObject = video;
			setIsUsingVideo(true);
		} catch (err) {
			console.log('Error: ', err);
		}
	}

	const handleRemoveUserVideo = () => {
		try {
			const userVideo = document.getElementById('user-video'); // @ts-ignore

			localStream.getTracks().forEach(track => track.stop()); // @ts-ignore
			userVideo.srcObject = null;
			setIsUsingVideo(false);
		} catch (err) {
			console.log('Error: ', err);
		}
	}

	const handleHangUp = async () => {
		handleRemoveUserVideo();
		router.push('/home');
	}

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

				<aside className="user" id="user-container">
					<video autoPlay={ true } className="user__video" id="user-video"></video>

					<button className="user__options" id="user-button">
						<BiDotsHorizontalRounded className="user__options-icon" />
					</button>
				</aside>

				<footer className="meet__footer">
					<div className="meet__data">
						<h3 className="meet__time">{ handleDisplayHour() }</h3>
						<div className="meet__data-divider" />
						<span className="meet__name">Team call</span>
					</div>

					<section className="meet__actions">
						<button className="action" onClick={ () => setIsUsingMicrophone(!isUsingMicrophone) }>
							{ isUsingMicrophone ? <BiMicrophone className="action-icon" /> : <BiMicrophoneOff className="action-icon" /> }
						</button>

						<button className="action" onClick={ isUsingVideo ? handleRemoveUserVideo : handleGetUserVideo }>
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
