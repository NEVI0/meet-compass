import React, { useState } from 'react';
import { BiCompass, BiUser, BiEnvelope, BiLock, BiAt } from 'react-icons/bi';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { JoinMeetModal } from '../../components';

import { v4 as uuid } from 'uuid';
import * as S from './styles';

const Home: NextPage = () => {

	const router = useRouter();

	const [ userName, setUserName ] = useState<string>('');
	const [ userEmail, setUserEmail ] = useState<string>('');
	const [ isPrivateMeet, setIsPrivateMeet ] = useState<string>('');
	const [ meetName, setMeetName ] = useState<string>('');

	const [ isJoinMeetModalVisible, setIsJoinMeetModalVisible ] = useState<boolean>(false);

	const isStartNewMeetButtonDisabled = () => !userName || !userEmail || !isPrivateMeet || !meetName;

	return (
		<S.HomeContainer id="home-container">
			<Head>
				<title>Meet Compass</title>
			</Head>

			<aside className="column column__left">
				<BiCompass className="logo" />
			</aside>

			<main className="column column__right home">
				<header className="home__header">
					<div className="home__logo">
						<BiCompass className="home__logo-icon" />
					</div>

					<div>
						<h1 className="home__title">
							Welcome to Meet Compass
						</h1>

						<p className="home__description">
							Fusce ultricies diam ut lectus scelerisque, non blandit velit accumsan. Pellentesque id magna elementum enim posuere pretium scelerisque a urna.
						</p>
					</div>
				</header>

				<form className="home__content">
					<div className="input">
						<BiUser className="input__icon" />

						<input
							type="text"
							className="input__field"
							placeholder="Your name"
							value={ userName }
							onChange={ event => setUserName(event.target.value) }
						/>
					</div>

					<div className="input">
						<BiEnvelope className="input__icon" />

						<input
							type="text"
							className="input__field"
							placeholder="E-mail"
							value={ userEmail }
							onChange={ event => setUserEmail(event.target.value) }
						/>
					</div>

					<div className="inputs-row">
						<div className="select">							
							<div className="input">
								<BiLock className="input__icon" />

								<input
									type="text"
									className="input__field"
									placeholder="Is a private meet?"
									disabled={ true }
									value={
										isPrivateMeet === 'YES' ? 'Yes, it is a private meet' :
										isPrivateMeet === 'NO' ? 'No, it is not a private meet'
										: ''
									}
								/>
							</div>

							<div className="select__items">
								<span className="select__items-item" onClick={ () => setIsPrivateMeet('YES') }>
									Yes, only allowed people can enter
								</span>
								
								<span className="select__items-item" onClick={ () => setIsPrivateMeet('NO') }>
									No, every one can enter
								</span>
							</div>
						</div>

						<div className="input">
							<BiAt className="input__icon" />

							<input
								type="text"
								className="input__field"
								placeholder="Meet name"
								value={ meetName }
								onChange={ event => setMeetName(event.target.value) }
							/>
						</div>
					</div>

					<button className="start__meet" disabled={ isStartNewMeetButtonDisabled() }>
						Start new meet
					</button>
				</form>

				<div className="home__divider">
					<div className="home__divider-line" />
					OR
					<div className="home__divider-line" />
				</div>

				<span className="home__join">
					Just enter in a public meet <a onClick={ () => setIsJoinMeetModalVisible(true) }>clicking here!</a>
				</span>
			</main>

			<JoinMeetModal
				visible={ isJoinMeetModalVisible }
				onClose={ () => setIsJoinMeetModalVisible(false) }
			/>
		</S.HomeContainer>
	);

}

export default Home;
