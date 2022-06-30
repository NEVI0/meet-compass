import * as Yup from 'yup';

export const formValidations = Yup.object().shape({
	userName: Yup.string()
	  .min(3, 'formValidations.userName.tooShort')
	  .max(50, 'formValidations.userName.tooLong')
	  .required('formValidations.userName.required'),
	userEmail: Yup.string()
		.email('formValidations.userEmail.invalid')
		.required('formValidations.userEmail.required'),
	meetName: Yup.string()
		.min(3, 'formValidations.meetName.tooShort')
		.max(50, 'formValidations.meetName.tooLong')
		.required('formValidations.meetName.required'),
});
