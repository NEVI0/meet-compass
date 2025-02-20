import * as yup from 'yup';
import { TFunction } from 'i18next';

export const CreateMeetSchema = (_: TFunction) => {
    return yup.object({}).shape({
        user: yup.string().required('Você precisa informar o seu nome!'),
        email: yup
            .string()
            .email('Deve ser um e-mail válido!')
            .required('Você precisa informar o seu e-mail!'),
        meet: yup
            .string()
            .required('Você precisa informar um nome para a sua reunião!'),
    });
};
