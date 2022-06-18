import React, { useState, useEffect } from 'react';
import { BiCompass, BiUser, BiEnvelope, BiAt } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Input, Button, JoinMeetModal } from '../../components';
import useAppContext from '../../contexts/AppContext';

import * as S from './styles';

const Home: NextPage = () => {

	const router = useRouter();
	const { t } = useTranslation();
	const { startNewMeet } = useAppContext();

	const [ userName, setUserName ] = useState<string>('');
	const [ userEmail, setUserEmail ] = useState<string>('');
	const [ meetName, setMeetName ] = useState<string>('');
	const [ defaultMeetId, setDefaultMeetId ] = useState<string>('');

	const [ isJoinMeetModalVisible, setIsJoinMeetModalVisible ] = useState<boolean>(false);

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

				<div className="home__content">
					<Input
						label={ t('inputPlaceholder.userName') }
						value={ userName }
						onChangeValue={ setUserName }
						icon={ <BiUser className="input__icon" /> }
					/>

					<Input
						label={ t('inputPlaceholder.email') }
						value={ userEmail }
						onChangeValue={ setUserEmail }
						icon={ <BiEnvelope className="input__icon" /> }
					/>

					<Input
						label={ t('inputPlaceholder.meetName') }
						value={ meetName }
						onChangeValue={ setMeetName }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button
						disabled={ !userName || !userEmail || !meetName }
						onClick={ () => startNewMeet(userName, userEmail, meetName) }
					>
						{ t('page.home.button') }
					</Button>
				</div>

				<div className="home__divider">
					<div className="home__divider-line" />
					{ t('page.home.or') }
					<div className="home__divider-line" />
				</div>

				<span className="home__join">
					{ t('page.home.joinMeet') } <a onClick={ () => setIsJoinMeetModalVisible(true) }>{ t('page.home.joinMeetLink') }</a>
				</span>
			</main>

			<JoinMeetModal
				visible={ isJoinMeetModalVisible }
				defaultMeetId={ defaultMeetId }
				onClose={ () => setIsJoinMeetModalVisible(false) }
			/>
		</S.HomeContainer>
	);

}

export default Home;
