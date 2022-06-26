import React, { useEffect } from 'react';
import { BiAt, BiEnvelope, BiUser, BiX } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';

import { Input, Button, IconButton } from '..';
import useMeetContext from '../../contexts/MeetContext';

import { formValidations } from './formValidations';
import * as S from './styles';

type TFormValues = {
	userName: string;
	userEmail: string;
	meetId: string;
}

interface JoinMeetModalProps {
	visible: boolean;
	defaultMeetId?: string;
	onClose: () => void;
}

const JoinMeetModal: React.FC<JoinMeetModalProps> = ({ visible, defaultMeetId, onClose }) => {

	const { t } = useTranslation();
	const { joinMeet } = useMeetContext();

	const handleMeetUser = (values: TFormValues) => {
		const { userName, userEmail, meetId } = values;
		
		form.setSubmitting(true);
		joinMeet(userName, userEmail, meetId);

		form.setSubmitting(false);
	}

	const handleCloseModal = () => {
		form.resetForm();
		onClose();
	}

	const form = useFormik({
		initialValues: {
			userName: '',
			userEmail: '',
			meetId: ''
		},
		validationSchema: formValidations,
		onSubmit: (values) => {
			handleMeetUser(values);
		}
	});

	useEffect(() => {
		if (defaultMeetId) form.setFieldValue('meetId', defaultMeetId)
	}, [defaultMeetId]);

	return (
		<S.JoinMeetModal visible={ visible }>
			<div className="joinmeet">
				<header className="joinmeet__header">
					<h2 className="joinmeet__title">
						{ t('joinMeetModal.title') }
					</h2>

					<IconButton
						icon={ <BiX /> }
						onClick={ handleCloseModal }
					/>
				</header>

				<form className="joinmeet__content" onSubmit={ form.handleSubmit }>
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
						name="meetId"
						placeholder={ t('inputPlaceholder.meetId') } // @ts-ignore
						error={ (form.errors.meetId && form.touched.meetId) && t(form.errors.meetId) }
						value={ form.values.meetId }
						onBlur={ form.handleBlur }
						onChangeValue={ value => form.setFieldValue('meetId', value) }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button disabled={ !form.isValid || form.isSubmitting }>
						{ t('joinMeetModal.button') }
					</Button>
				</form>
			</div>
		</S.JoinMeetModal>
	);

}

export default JoinMeetModal;
