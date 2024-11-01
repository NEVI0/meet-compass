import { FC } from 'react';

import { Form, Formik } from 'formik';

import { useLocale } from '@presentation/contexts/LocaleContext';
import { Button, IconButton, Input } from '@presentation/components';

import { useRequestMeetAccess } from './hooks/useRequestMeetAccess';
import * as S from './styles';

interface JoinMeetModalAbstract {
    onClose: () => void;
}

export const JoinMeetModal: FC<JoinMeetModalAbstract> = ({ onClose }) => {
    const { t } = useLocale();
    const { request, loading } = useRequestMeetAccess();

    return (
        <S.Container>
            <div className="modal">
                <header className="modal__header">
                    <h2 className="modal__title">Entrar em uma reunião</h2>
                    <IconButton icon="x" onClick={onClose} />
                </header>

                <Formik
                    initialValues={{
                        user: '',
                        email: '',
                        meet: '',
                    }}
                    onSubmit={values => {
                        request({
                            user: values.user,
                            email: values.email,
                            meet: { id: values.meet },
                            signal: null,
                        });
                    }}
                >
                    <Form className="modal__form">
                        <div className="modal__content">
                            <Input
                                name="user"
                                icon="user"
                                label={t('inputPlaceholder.userName')}
                            />

                            <Input
                                name="email"
                                type="email"
                                icon="mail"
                                label={t('inputPlaceholder.email')}
                                placeholder="example@gmail.com"
                            />

                            <Input
                                name="meet"
                                icon="at"
                                label="ID da reunião"
                            />
                        </div>

                        <footer className="modal__footer">
                            <Button type="submit" icon="send" loading={loading}>
                                Pedir para entrar
                            </Button>
                        </footer>
                    </Form>
                </Formik>
            </div>
        </S.Container>
    );
};
