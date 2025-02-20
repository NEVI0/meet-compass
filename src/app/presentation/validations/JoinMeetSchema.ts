import * as yup from 'yup';
import { TFunction } from 'i18next';

export const JoinMeetSchema = (_: TFunction) => {
    return yup.object({}).shape({
        user: yup.string().required('Você precisa informar o seu nome!'),
        email: yup
            .string()
            .email('Deve ser um e-mail válido!')
            .required('Você precisa informar o seu e-mail!'),
        meet: yup.string().required('Você precisa informar o ID da reunião!'),
    });
};
