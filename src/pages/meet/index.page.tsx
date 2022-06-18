import React, { useState, useEffect } from 'react';
import { BiMenu, BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff, BiDesktop, BiPhoneOff, BiMove, BiUndo, BiEdit, BiUserX, BiEnvelope, BiCopy, BiX } from 'react-icons/bi';
import { MutatingDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ReceivingCallModal } from '../../components';
import useAppContext from '../../contexts/AppContext';

import { isEmpty } from '../../utils/functions';
import { useWindowBreakpoints } from '../../hooks';
import { LOTTIE_OPTIONS, TOAST_DEFAULT_CONFIG } from '../../utils/constants';

import * as emptyAnimation from '../../../public/assets/animations/empty.json';
import * as S from './styles';
import { theme } from '../../styles/theme';

const ANIMATION_DIMENSIONS = {
	'xsm': { width: 275, height: 115 },
	'sm': { width: 275, height: 115 },
	'md': { width: 370, height: 165 },
	'lg': { width: 370, height: 165 },
	'xl': { width: 550, height: 230 },
	'xxl': { width: 550, height: 230 }
}

const Meet: NextPage = () => {

	const router = useRouter();
	const breakpoint = useWindowBreakpoints();
	const { t } = useTranslation();
	const {
		selectedLanguage,
		userVideoRef,
		otherUserVideoRef,
		meetName,
		userData,
		otherUserData,
		meetRequestAccepted,
		isReceivingMeetRequest,
		getUserStream,
		isCallingUser,
		changeSelectedLanguage
	} = useAppContext();

	const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);
	const [ isSharingScreen, setIsSharingScreen ] = useState<boolean>(false);
	const [ isUsingVideo, setIsUsingVideo ] = useState<boolean>(false);
	const [ isUsingMicrophone, setIsUsingMicrophone ] = useState<boolean>(false);

	const handleCopyMeetId = () => {
		navigator.clipboard.writeText(userData.id);
		toast(t('page.meet.toastMessage'), TOAST_DEFAULT_CONFIG);
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
		<S.MeetContainer isMenuOpen={ isMenuOpen } isSharingScreen={ isSharingScreen } isUsingVideo={ isUsingVideo }>
			<Head>
				<title>Meet Compass - { t('page.meet.title') }</title>
			</Head>

			<header className="header">
				<h2 className="header__title">
					{ meetName || 'Meet name' }
				</h2>

				<button className="header__menu" onClick={ () => setIsMenuOpen(true) }>
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
				{
					isCallingUser ? (
						<div className="calling">
							<MutatingDots
								ariaLabel="loading-indicator"
								width={ 100 }
								height={ 100 }
								color={ theme.colors.primary }
								secondaryColor={ theme.colors.secondary }
							/>

							<div>
								<h2 className="calling__title">
									{ t('page.meet.calling.title', { user: otherUserData.name }) }
								</h2>

								<p className="calling__message">
									<a>{ t('page.meet.calling.messageLink') }</a> { t('page.meet.calling.message') }
								</p>
							</div>
						</div>
					) : isEmpty(otherUserData) ? (
						<div className="empty">
							<Lottie
								isPaused={ false }
								isStopped={ false }
								isClickToPauseDisabled={ true }
								style={{ transition: '.3s' }}
								width={ ANIMATION_DIMENSIONS[breakpoint].width }
								height={ ANIMATION_DIMENSIONS[breakpoint].height }
								options={{ ...LOTTIE_OPTIONS, animationData: emptyAnimation }}
							/>

							<div>
								<h2 className="empty__title">
									{ t('page.meet.empty.title') }
								</h2>

								<p className="empty__message">
									{ t('page.meet.empty.message') } <a onClick={ handleCopyMeetId }>{ t('page.meet.empty.messageLink') }</a>
								</p>
							</div>
						</div>
					) : (
						<div className="otheruser" id="other-user-container">
							<video
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
						</div>
					)
				}
			</main>

			<footer className="footer">
				<h2 className="footer__title">
					{ meetName || 'Meet name' }
				</h2>
				
				<section className="footer__actions">
					<S.ActionButton>
						<button
							className="action__button"
							onClick={ handleUpdateUserAudioState }
						>
							{ isUsingMicrophone ? <BiMicrophone className="action__button-icon" /> : <BiMicrophoneOff className="action__button-icon" /> }
						</button>

						<div className="action__tooltip">
							{
								isUsingMicrophone ? t('page.meet.tooltip.microphone.disable') : t('page.meet.tooltip.microphone.enable')
							}
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
							{
								isUsingVideo ? t('page.meet.tooltip.video.disable') : t('page.meet.tooltip.video.enable')
							}
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
							{
								isSharingScreen ? t('page.meet.tooltip.shareScreen.stop') : t('page.meet.tooltip.shareScreen.start')
							}
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
							{ t('page.meet.tooltip.left') }
						</div>
					</S.ActionButton>
				</section>

				<div className="footer__more">
					<span className="footer__meetid">
						{ userData.id }
					</span>

					<button className="footer__menu" onClick={ () => setIsMenuOpen(true) }>
						<BiMenu />
					</button>
				</div>
			</footer>

			<menu className="menu">
				<section className="menu__header">
					<div className="menu__data">
						<h1 className="menu__title">
							{ userData.name }
						</h1>

						<h2 className="menu__subtitle">
							{ userData.email }
						</h2>
					</div>

					<button className="menu__close" onClick={ () => setIsMenuOpen(false) }>
						<BiX />
					</button>
				</section>

				<hr className="menu__divider" />

				<div className="menu__items">
					<S.MenuItem>
						<BiEdit className="menuitem__icon" />

						<p className="menuitem__description">
							{ t('page.home.menu.editName') }
						</p>
					</S.MenuItem>

					<S.MenuItem onClick={ handleCopyMeetId }>
						<BiCopy className="menuitem__icon" />

						<p className="menuitem__description">
							{ t('page.home.menu.copyId') }
						</p>
					</S.MenuItem>

					{
						!isEmpty(otherUserData) && <>
							<S.MenuItem>
								<BiEnvelope className="menuitem__icon" />

								<p className="menuitem__description">
									{ t('page.home.menu.sendEmail', { user: otherUserData.name }) }
								</p>
							</S.MenuItem>

							<S.MenuItem>
								<BiUserX className="menuitem__icon" />

								<p className="menuitem__description">
									{ t('page.home.menu.removeUser', { user: otherUserData.name }) }
								</p>
							</S.MenuItem>
						</>
					}
				</div>

				<div className="menu__footer">
					<button className="language" onClick={ changeSelectedLanguage }>
						<img
							src={ selectedLanguage === 'en' ? 'assets/images/usa-icon.png' : 'assets/images/brazil-icon.png' }
							alt={ selectedLanguage === 'en' ? 'United States flag' : 'Brazil flag' }
							className="language__icon"
						/>

						<span className="language__initials">
							{ selectedLanguage }
						</span>
					</button>
				</div>
			</menu>

			<ReceivingCallModal visible={ isReceivingMeetRequest && !meetRequestAccepted } />
		</S.MeetContainer>
	);

}

export default Meet;
