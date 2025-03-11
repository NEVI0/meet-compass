import { FC } from 'react';

import { Formik } from 'formik';

import { useLocale } from '@app/presentation/contexts/LocaleContext';
import { Button, IconButton, Input } from '@app/presentation/components';
import { JoinMeetSchema } from '@app/presentation/validations';

import { useRequestMeetAccess } from './hooks';
import * as S from './styles';

interface JoinMeetModalAbstract {
    meetId?: string;
    onClose: () => void;
}

export const JoinMeetModal: FC<JoinMeetModalAbstract> = ({
    meetId,
    onClose,
}) => {
    const { t } = useLocale();
    const { request, loading } = useRequestMeetAccess();

    return (
        <S.Container>
            <div>
                <header>
                    <h2>Entrar em uma reunião</h2>
                    <IconButton icon="x" onClick={onClose} />
                </header>

                <Formik
                    initialValues={{
                        user: '',
                        email: '',
                        meet: meetId || '',
                    }}
                    validateOnMount={false}
                    validationSchema={JoinMeetSchema(t)}
                    onSubmit={values => {
                        request({
                            user: values.user,
                            email: values.email,
                            meetId: values.meet,
                            signal: null,
                        });
                    }}
                >
                    {form => (
                        <form onSubmit={form.handleSubmit}>
                            <div>
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

                            <Button
                                type="submit"
                                icon="send"
                                loading={loading}
                                disabled={!form.isValid}
                            >
                                Pedir para entrar
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </S.Container>
    );
};
