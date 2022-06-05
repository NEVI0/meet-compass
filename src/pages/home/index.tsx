import React, { useState } from 'react';
import { BiVideo, BiRightArrowAlt } from 'react-icons/bi';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

import * as S from './styles';

const Home: NextPage = () => {

	const router = useRouter();
	const [ callLink, setCallLink ] = useState<string>('');

	return (
		<S.HomeContainer id="home-container">
			<Head>
				<title>Home - Video Compass</title>
			</Head>

			<div className="home">
				<section className="home__column home__column-left">
					<header className="home__header">
						<h1 className="home__title">
							Video compass, callings faster than ever here!
						</h1>

						<p className="home__description">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat, sapien sit amet tempus tempor, risus tellus pulvinar metus, non gravida magna mauris nec elit. 
						</p>
					</header>

					<main className="home__content">
						<button className="start__meeting" onClick={ () => router.push(`/meet/${uuid()}`) }>
							<BiVideo className="start__meeting-icon" />
							Start a new call
						</button>

						<div className="paste__link">
							<input
								type="text"
								className="paste__link-input"
								placeholder="Paste here a call link"
								value={ callLink }
								onChange={ event => setCallLink(event.target.value) }
							/>

							<button className="paste__link-button" disabled={ !callLink }>
								Join
								<BiRightArrowAlt className="paste__link-icon" />
							</button>
						</div>
					</main>

					<hr className="home__divider" />

					<footer className="home__footer">
						<span className="footer__more">
							Know more about video compass <a>here!</a>
						</span>

						<span className="footer__copyright">
							All rights reserved for Névio Costa Magagnin &copy;
						</span>
					</footer>
				</section>

				<aside className="home__column home__column-right">
					<div className="home__wallpaper">
						
					</div>
				</aside>
			</div>
		</S.HomeContainer>
	);

}

export default Home;

/*

import Lottie from 'react-lottie';
import * as rocketAnimation from '../../../public/assets/animations/rocket.json';

<Lottie
	width={ 400 }
	height={ 400 }
	isStopped={ false }
	isPaused={ false }
	options={{
		loop: true,
		autoplay: true, 
		animationData: rocketAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}}
/>

*/
