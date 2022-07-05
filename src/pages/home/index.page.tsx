import React, { useState, useEffect } from 'react';
import { BiCompass, BiUser, BiEnvelope, BiAt } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import { Input, Button, JoinMeetModal, LanguageSwitch } from '../../components';
import useMeetContext from '../../contexts/MeetContext';

import { TOAST_DEFAULT_CONFIG } from '../../utils/constants';
import { formValidations } from './formValidations';

import { theme } from '../../styles/theme';
import * as S from './styles';

type TFormValues = {
	userName: string;
	userEmail: string;
	meetName: string;
}

const Home: NextPage = () => {

	const router = useRouter();
	const { t } = useTranslation();
	const { userStream, isCallingUser, startNewMeet, clearUserStream } = useMeetContext();
	
	const [ defaultMeetId, setDefaultMeetId ] = useState<string>('');
	const [ isJoinMeetModalVisible, setIsJoinMeetModalVisible ] = useState<boolean>(false);

	const handleCreateMeet = (values: TFormValues) => {
		const { userName, userEmail, meetName } = values;

		form.setSubmitting(true);
		const hadSuccess = startNewMeet(userName, userEmail, meetName);

		form.setSubmitting(false);
		if (!hadSuccess) return toast(t('toastMessage.errorWhileStartingMeet'), TOAST_DEFAULT_CONFIG);
		
		router.push('/meet');
	}

	const form = useFormik({
		initialValues: {
			userName: '',
			userEmail: '',
			meetName: ''
		},
		validationSchema: formValidations,
		onSubmit: (values) => {
			handleCreateMeet(values);
		}
	});

	useEffect(() => {
		if (userStream && !isCallingUser) {
			const tracks = userStream.getTracks();
			tracks.forEach(track => track.stop());

			clearUserStream();
		}
	}, [userStream]);

	useEffect(() => {
		const { meetId } = router.query;

		if (meetId) {
			setIsJoinMeetModalVisible(true); // @ts-ignore
			setDefaultMeetId(meetId);
		}
	}, [router.query]);

	return (
		<S.HomeContainer>
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

				<form className="home__content" onSubmit={ form.handleSubmit }>
					<Input
						name="userName"
						placeholder={ t('inputPlaceholder.userName') } // @ts-ignore
						error={ (form.errors.userName && form.touched.userName) && t(form.errors.userName) }
						value={ form.values.userName }
						onBlur={ form.handleBlur }
						onChangeValue={ value => form.setFieldValue('userName', value) }
						icon={ <BiUser className="input__icon" /> }
					/>

					<Input
						name="userEmail"
						type="email"
						placeholder={ t('inputPlaceholder.email') } // @ts-ignore
						error={ (form.errors.userEmail && form.touched.userEmail) && t(form.errors.userEmail) }
						value={ form.values.userEmail }
						onBlur={ form.handleBlur }
						onChangeValue={ value => form.setFieldValue('userEmail', value) }
						icon={ <BiEnvelope className="input__icon" /> }
					/>

					<Input
						name="meetName"
						placeholder={ t('inputPlaceholder.meetName') } // @ts-ignore
						error={ (form.errors.meetName && form.touched.meetName) && t(form.errors.meetName) }
						value={ form.values.meetName }
						onBlur={ form.handleBlur }
						onChangeValue={ value => form.setFieldValue('meetName', value) }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button disabled={ !form.isValid || form.isSubmitting }>
						{
							form.isSubmitting ? (
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

			<div className="language-switch">
				<LanguageSwitch />
			</div>

			<JoinMeetModal
				visible={ isJoinMeetModalVisible }
				defaultMeetId={ defaultMeetId }
				onClose={ () => setIsJoinMeetModalVisible(false) }
			/>
		</S.HomeContainer>
	);

}

export default Home;
