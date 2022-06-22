import * as Yup from 'yup';

export const formValidations = Yup.object().shape({
	userName: Yup.string()
	  .min(3, 'page.home.form.userName.toShort')
	  .max(50, 'page.home.form.userName.toLong')
	  .required('page.home.form.userName.required'),
	userEmail: Yup.string()
		.email('page.home.form.userEmail.invalid')
		.required('page.home.form.userName.required'),
	meetName: Yup.string()
		.min(3, 'page.home.form.meetName.toShort')
		.max(50, 'page.home.form.meetName.toLong')
		.required('page.home.form.meetName.required'),
});
