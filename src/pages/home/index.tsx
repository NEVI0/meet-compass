import React, { useState, useEffect } from 'react';
import { BiCompass, BiUser, BiEnvelope, BiLock, BiAt } from 'react-icons/bi';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Input, Button, JoinMeetModal } from '../../components';
import useAppContext from '../../contexts/AppContext';

import * as S from './styles';

const Home: NextPage = () => {

	const router = useRouter();
	const { startNewMeet } = useAppContext();

	const [ userName, setUserName ] = useState<string>('');
	const [ userEmail, setUserEmail ] = useState<string>('');
	const [ isPrivateMeet, setIsPrivateMeet ] = useState<string>('');
	const [ meetName, setMeetName ] = useState<string>('');
	const [ defaultUserToCallId, setDefaultUserToCallId ] = useState<string>('');

	const [ isJoinMeetModalVisible, setIsJoinMeetModalVisible ] = useState<boolean>(false);

	const isStartNewMeetButtonDisabled = () => !userName || !userEmail || !meetName;

	useEffect(() => { 
		const { callId } = router.query;

		if (callId) {
			setIsJoinMeetModalVisible(true); // @ts-ignore
			setDefaultUserToCallId(callId);
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
							Welcome to Meet Compass
						</h1>

						<p className="home__description">
							Fusce ultricies diam ut lectus scelerisque, non blandit velit accumsan. 
						</p>
					</div>
				</header>

				<div className="home__content">
					<Input
						label="Your name"
						value={ userName }
						onChangeValue={ setUserName }
						icon={ <BiUser className="input__icon" /> }
					/>

					<Input
						label="E-mail"
						value={ userEmail }
						onChangeValue={ setUserEmail }
						icon={ <BiEnvelope className="input__icon" /> }
					/>

					<Input
						label="Meet name"
						value={ meetName }
						onChangeValue={ setMeetName }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button
						disabled={ isStartNewMeetButtonDisabled() }
						onClick={ () => startNewMeet(userName, userEmail, meetName) }
					>
						Start new meet
					</Button>
				</div>

				<div className="home__divider">
					<div className="home__divider-line" />
					OR
					<div className="home__divider-line" />
				</div>

				<span className="home__join">
					Just enter in a friends meet <a onClick={ () => setIsJoinMeetModalVisible(true) }>clicking here!</a>
				</span>
			</main>

			<JoinMeetModal
				visible={ isJoinMeetModalVisible }
				defaultUserToCallId={ defaultUserToCallId }
				onClose={ () => setIsJoinMeetModalVisible(false) }
			/>
		</S.HomeContainer>
	);

}

export default Home;
