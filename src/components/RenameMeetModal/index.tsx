import React from 'react';
import { BiX, BiAt } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Input, Button, IconButton } from '..';
import useMeetContext from '../../contexts/MeetContext';

import * as S from './styles';

type TFormValues = {
	newMeetName: string;
}

const RenameMeetModal: React.FC<{ visible: boolean; onClose: () => void; }> = ({ visible, onClose }) => {

	const { t } = useTranslation();
	const { renameMeet } = useMeetContext();

	const handleRenameMeet = (values: TFormValues) => {
		renameMeet(values.newMeetName);
		form.resetForm();
		onClose();
	}

	const form = useFormik({
		initialValues: {
			newMeetName: ''
		},
		validationSchema: Yup.object().shape({
			newMeetName: Yup.string()
				.min(3, 'formValidations.meetName.tooShort')
				.max(50, 'formValidations.meetName.tooLong')
				.required('formValidations.meetName.required')
		}),
		onSubmit: (values) => {
			handleRenameMeet(values);
		}
	});

	return (
		<S.RenameMeetModal visible={ visible } data-testid="renameMeetModal">
			<div className="renamemeet">
				<header className="renamemeet__header">
					<h2 className="renamemeet__title">
						{ t('renameMeetModal.title') }
					</h2>

					<IconButton
						testId="closeRenameMeetModalButton"
						icon={ <BiX /> }
						onClick={ onClose }
					/>
				</header>

				<form className="renamemeet__content" onSubmit={ form.handleSubmit }>
					<Input
						testId="renameMeetInput"
						name="newMeetName"
						placeholder={ t('inputPlaceholder.newMeetName') } // @ts-ignore
						error={ (form.errors.newMeetName && form.touched.newMeetName) && t(form.errors.newMeetName) }
						value={ form.values.newMeetName }
						onBlur={ form.handleBlur }
						onChangeValue={ value => form.setFieldValue('newMeetName', value) }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button testId="renameMeetButton" type="submit" disabled={ !form.isValid }>
						{ t('renameMeetModal.rename') }
					</Button>
				</form>
			</div>
		</S.RenameMeetModal>
	);

}

export default RenameMeetModal;
