import React, { useState, useEffect } from 'react';
import { BiUserCircle, BiMenu, BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff, BiDesktop, BiPhoneOff, BiChat, BiEdit, BiUserX, BiEnvelope, BiCopy, BiExpand } from 'react-icons/bi';
import { MutatingDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { IconButton, ReceivingCallModal, RenameMeetModal, Chat, Menu } from '../../components';
import useMeetContext from '../../contexts/MeetContext';

import { isEmpty } from '../../utils/functions';
import { LOTTIE_OPTIONS, TOAST_DEFAULT_CONFIG } from '../../utils/constants';
import { useWindowBreakpoints } from '../../hooks';

import { theme } from '../../styles/theme';
import * as emptyAnimation from '../../../public/assets/animations/empty.json';
import * as S from './styles';

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
		
		isSharingScreen,
		isUsingVideo,
		isUsingMicrophone,
		isOtherUserSharingScreen,

		getUserStream,
		cancelMeetRequest,
		removeOtherUserFromMeet,
		leftMeet,
		updateStreamAudio,
		updateStreamVideo,
		updateScreenSharing
	} = useMeetContext();

	const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);
	const [ isChatOpen, setIsChatOpen ] = useState<boolean>(false);
	const [ isRenameMeetModalVisible, setIsRenameMeetModalVisible ] = useState<boolean>(false);

	const handleCopyMeetId = async () => {
		try {
			setIsMenuOpen(false);
			await navigator.clipboard.writeText(`${window.origin}/home?meetId=${userData.id}`);
			toast(t('page.meet.toast.copyId'), TOAST_DEFAULT_CONFIG);
		} catch (error) {
			toast('Could not copy meet ID. Please try again!', TOAST_DEFAULT_CONFIG);
		}
	}

	const handleRenameMeet = () => {
		setIsMenuOpen(false);
		setIsRenameMeetModalVisible(true);
	}

	const handleOpenChat = () => {
		setIsMenuOpen(false);
		setIsChatOpen(true);
	}

	useEffect(() => {
		if (isEmpty(userData)) router.push('/home');
		getUserStream();
	}, []);

	return (
		<S.MeetContainer
			isUsingVideo={ isUsingVideo }
			isSharingScreen={ isSharingScreen }
			isOtherUserVideoStopped={ isOtherUserVideoStopped }
		>
			<Head>
				<title>Meet Compass - { t('page.meet.title') }</title>
			</Head>

			<header className="header">
				<h2 className="header__title">
					{ meetName || 'Meet name' }
				</h2>

				<IconButton
					onClick={ () => setIsMenuOpen(true) }
					icon={ <BiMenu /> }
				/>
			</header>

			<aside className="user">
				<video
					muted
					playsInline
					autoPlay
					ref={ userVideoRef }
					className="user__video"
					id="user-video"
				></video>
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
									<a onClick={ cancelMeetRequest }>{ t('page.meet.calling.messageLink') }</a> { t('page.meet.calling.message') }
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
						<div className="otheruser">
							<video
								playsInline
								autoPlay
								ref={ otherUserVideoRef }
								className="otheruser__video"
							></video>

							{
								isOtherUserVideoStopped && (
									<BiUserCircle className="otheruser__user-icon" />
								)
							}
							
							<div className="otheruser__data">
								<span className="otheruser__name">
									{ otherUserData.name || 'My friend' }
								</span>

								{
									isOtherUserMuted ? (
										<BiMicrophoneOff className="otheruser__mic-icon" />
									) : (
										<BiMicrophone className="otheruser__mic-icon" />
									)
								}
							</div>

							{
								isOtherUserSharingScreen && (
									<button
										className="otheruser__fullscreen"
										onClick={ () => otherUserVideoRef.current?.requestFullscreen() }
									>
										<BiExpand />
									</button>
								)
							}
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
						<button className="action__button" onClick={ updateStreamAudio }>
							{ isUsingMicrophone ? <BiMicrophone className="action__button-icon" /> : <BiMicrophoneOff className="action__button-icon" /> }
						</button>

						<div className="action__tooltip">
							{ isUsingMicrophone ? t('page.meet.tooltip.microphone.disable') : t('page.meet.tooltip.microphone.enable') }
						</div>
					</S.ActionButton>

					<S.ActionButton>
						<button className="action__button" onClick={ updateStreamVideo }>
							{ isUsingVideo ? <BiVideo className="action__button-icon" /> : <BiVideoOff className="action__button-icon" /> }
						</button>

						<div className="action__tooltip">
							{ isUsingVideo ? t('page.meet.tooltip.video.disable') : t('page.meet.tooltip.video.enable') }
						</div>
					</S.ActionButton>

					<S.ActionButton>
						<button className={`action__button ${isSharingScreen && 'action__button-sharing'}`} onClick={ updateScreenSharing }>
							<BiDesktop className="action__button-icon" />
						</button>

						<div className="action__tooltip">
							{ isSharingScreen ? t('page.meet.tooltip.shareScreen.stop') : t('page.meet.tooltip.shareScreen.start') }
						</div>
					</S.ActionButton>

					<S.ActionButton>
						<button className="action__button action__button-hangup" onClick={ leftMeet }>
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

					<IconButton
						onClick={ () => setIsMenuOpen(true) }
						icon={ <BiMenu /> }
					/>
				</div>
			</footer>

			<Chat visible={ isChatOpen } onClose={ () => setIsChatOpen(false) } />
			<Menu visible={ isMenuOpen } onClose={ () => setIsMenuOpen(false) }>
				<S.MenuItem onClick={ handleRenameMeet }>
					<BiEdit className="menuitem__icon" />

					<p className="menuitem__description">
						{ t('page.meet.menu.editName') }
					</p>
				</S.MenuItem>

				<S.MenuItem onClick={ handleCopyMeetId }>
					<BiCopy className="menuitem__icon" />

					<p className="menuitem__description">
						{ t('page.meet.menu.copyId') }
					</p>
				</S.MenuItem>

				{
					!isEmpty(otherUserData) && <>
						<S.MenuItem onClick={ handleOpenChat }>
							<BiChat className="menuitem__icon" />

							<p className="menuitem__description">
								{ t('page.meet.menu.openChat') }
							</p>
						</S.MenuItem>
						
						<S.MenuItem href={`mailto:${otherUserData.email}`}>
							<BiEnvelope className="menuitem__icon" />

							<p className="menuitem__description">
								{ t('page.meet.menu.sendEmail', { user: otherUserData.name }) }
							</p>
						</S.MenuItem>

						<S.MenuItem onClick={ removeOtherUserFromMeet }>
							<BiUserX className="menuitem__icon" />

							<p className="menuitem__description">
								{ t('page.meet.menu.removeUser', { user: otherUserData.name }) }
							</p>
						</S.MenuItem>
					</>
				}
			</Menu>

			<RenameMeetModal visible={ isRenameMeetModalVisible } onClose={ () => setIsRenameMeetModalVisible(false) } />
			<ReceivingCallModal visible={ isReceivingMeetRequest && !meetRequestAccepted } />
		</S.MeetContainer>
	);

}

export default Meet;
