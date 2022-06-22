import React, { useState, useEffect } from 'react';
import { BiCompass, BiUser, BiEnvelope, BiAt } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Input, Button, JoinMeetModal } from '../../components';
import useAppContext from '../../contexts/AppContext';

import { TOAST_DEFAULT_CONFIG } from '../../utils/constants';
import { theme } from '../../styles/theme';
import * as S from './styles';

const Home: NextPage = () => {

	const router = useRouter();
	const { t } = useTranslation();
	const { selectedLanguage, startNewMeet, changeSelectedLanguage } = useAppContext();

	const [ userName, setUserName ] = useState<string>('');
	const [ userEmail, setUserEmail ] = useState<string>('');
	const [ meetName, setMeetName ] = useState<string>('');
	const [ defaultMeetId, setDefaultMeetId ] = useState<string>('');

	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const [ isJoinMeetModalVisible, setIsJoinMeetModalVisible ] = useState<boolean>(false);

	const handleSubmitForm = (event: Event) => {
		event.preventDefault();

		setIsLoading(true);
		const hadSuccess = startNewMeet(userName, userEmail, meetName);

		setIsLoading(false);
		if (!hadSuccess) return toast(t('page.home.toast.errorInStartingMeet'), TOAST_DEFAULT_CONFIG);
		
		router.push('/meet');
	}

	useEffect(() => {
		const { meetId } = router.query;

		if (meetId) {
			setIsJoinMeetModalVisible(true); // @ts-ignore
			setDefaultMeetId(meetId);
		}
	}, []);
 
	return (
		<S.HomeContainer id="home-container">
			<Head>
				<title>Meet Compass</title>
			</Head>

			<aside className="left">
				<BiCompass className="logo" />
			</aside>

			<main className="home">
				<header className="home__header">
					<div className="home__logo">
						<BiCompass className="home__logo-icon" />
					</div>

					<div>
						<h1 className="home__title">
							{ t("page.home.title") }
						</h1>

						<p className="home__description">
							{ t("page.home.subtitle") } 
						</p>
					</div>
				</header>

				<form className="home__content">
					<Input
						name="name"
						placeholder={ t('inputPlaceholder.userName') }
						value={ userName }
						onChangeValue={ setUserName }
						icon={ <BiUser className="input__icon" /> }
					/>

					<Input
						name="email"
						placeholder={ t('inputPlaceholder.email') }
						value={ userEmail }
						onChangeValue={ setUserEmail }
						icon={ <BiEnvelope className="input__icon" /> }
					/>

					<Input
						name="meet-name"
						placeholder={ t('inputPlaceholder.meetName') }
						value={ meetName }
						onChangeValue={ setMeetName }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button
						disabled={ !userName || !userEmail || !meetName || isLoading } // @ts-ignore
						onClick={ handleSubmitForm }
					>
						{
							isLoading ? (
								<Oval
									ariaLabel="loading-indicator"
									height={ 20 }
									width={ 20 }
									strokeWidth={ 5 }
									color={ theme.colors.primary }
									secondaryColor="transparent"
								/>
							) : t('page.home.button')
						}
					</Button>
				</form>

				<div className="home__divider">
					<div className="home__divider-line" />
					{ t('page.home.or') }
					<div className="home__divider-line" />
				</div>

				<span className="home__join">
					{ t('page.home.joinMeet') } <a onClick={ () => setIsJoinMeetModalVisible(true) }>{ t('page.home.joinMeetLink') }</a>
				</span>
			</main>

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

			<JoinMeetModal
				visible={ isJoinMeetModalVisible }
				defaultMeetId={ defaultMeetId }
				onClose={ () => setIsJoinMeetModalVisible(false) }
			/>
		</S.HomeContainer>
	);

}

export default Home;
