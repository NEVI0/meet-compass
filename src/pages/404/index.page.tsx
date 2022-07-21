import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useWindowBreakpoints } from '../../hooks';
import { LOTTIE_OPTIONS } from '../../utils/constants';

import * as notFoundAnimation from '../../../public/assets/animations/not-found.json';
import * as S from './styles';

export const NOT_FOUND_SECONDS_TO_REDIRECT = 5000;

const ANIMATION_DIMENSIONS = {
	'xsm': { width: 300, height: 150 },
	'sm': { width: 300, height: 150 },
	'md': { width: 300, height: 150 },
	'lg': { width: 500, height: 250 },
	'xl': { width: 500, height: 250 },
	'xxl': { width: 500, height: 250 }
}

const NotFound: NextPage = () => {

	const router = useRouter();
	const breakpoint = useWindowBreakpoints();
	const { t } = useTranslation();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace('/home');
		}, NOT_FOUND_SECONDS_TO_REDIRECT);

		return () => clearTimeout(timer);
	}, []);

	return (
		<S.NotFoundContainer>
			<main className="notfound">
				<Lottie
					isStopped={ false }
					isPaused={ false }
					isClickToPauseDisabled={ true }
					style={{ transition: '.3s' }}
					width={ ANIMATION_DIMENSIONS[breakpoint].width }
					height={ ANIMATION_DIMENSIONS[breakpoint].height }
					options={{ ...LOTTIE_OPTIONS, animationData: notFoundAnimation }}
				/>

				<div>
					<h1 className="notfound__title">
						{ t('page.notFound.title') }
					</h1>

					<p className="notfound__message">
						{ t('page.notFound.message') }
					</p>
				</div>
			</main>
		</S.NotFoundContainer>
	);

}

export default NotFound;
