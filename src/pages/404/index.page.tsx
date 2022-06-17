import React, { useEffect } from 'react';
import Lottie from 'react-lottie';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import * as notFoundAnimation from '../../../public/assets/animations/not-found.json';
import * as S from './styles';

const NotFound: NextPage = () => {

	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace('/home');
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<S.NotFoundContainer>
			<main className="notfound">
				<Lottie
					width={ 500 }
					height={ 250 }
					isStopped={ false }
					isPaused={ false }
					options={{
						loop: true,
						autoplay: true, 
						animationData: notFoundAnimation,
						rendererSettings: {
							preserveAspectRatio: 'xMidYMid slice'
						}
					}}
				/>

				<div>
					<h1 className="notfound__title">
						Ops... there is nothing here!
					</h1>

					<p className="notfound__message">
						You are going to be redirect to home page in about 5 seconds.
					</p>
				</div>
			</main>
		</S.NotFoundContainer>
	);

}

export default NotFound;
