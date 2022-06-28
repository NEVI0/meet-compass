import * as Yup from 'yup';

export const formValidations = Yup.object().shape({
	userName: Yup.string()
	  .min(3, 'page.home.form.userName.tooShort')
	  .max(50, 'page.home.form.userName.tooLong')
	  .required('page.home.form.userName.required'),
	userEmail: Yup.string()
		.email('page.home.form.userEmail.invalid')
		.required('page.home.form.userEmail.required'),
	meetName: Yup.string()
		.min(3, 'page.home.form.meetName.tooShort')
		.max(50, 'page.home.form.meetName.tooLong')
		.required('page.home.form.meetName.required'),
});
